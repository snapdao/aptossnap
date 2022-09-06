import {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled
} from './utils'
import { EntryFunctionPayload, HexEncodedBytes, TransactionPayload } from 'aptos/dist/generated'
import { AptosClient } from 'aptos'
import { sendSnapMethod } from './methods'

const defaultSnapOrigin = 'npm:@keystonehq/aptossnap'

export {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled
} from './utils'

export type SnapInstallationParamNames = 'version' | string;

export class WalletAdapter {
  protected readonly snapId: string;
  protected readonly config: SnapConfig;
  protected snapInstallationParams: Record<SnapInstallationParamNames, unknown>;
  protected _wallet: any | null;

  constructor (config: SnapConfig,
    snapOrigin?: string,
    snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {
      version: 'latest'
    }) {
    this.config = config
    this.snapId = snapOrigin ?? defaultSnapOrigin
    this.snapId = `wallet_snap_${snapOrigin}`
    this.snapInstallationParams = snapInstallationParams
  }

  connected (): boolean {
    return !!this._wallet?.isConnected
  }

  async connect (): Promise<void> {
    // check all conditions
    if (!hasMetaMask()) {
      throw new Error('Metamask is not installed')
    }
    if (!(await isMetamaskSnapsSupported())) {
      throw new Error("Current Metamask version doesn't support snaps")
    }
    if (!this.config.network) {
      throw new Error('Configuration must at least define network type')
    }

    const isInstalled = await isSnapInstalled(this.snapId)
    const isReinstall = true
    if (!isInstalled) {
      this.snapInstallationParams = { version: 'latest' }
      // // enable snap
      await window.ethereum.request({
        method: 'wallet_enable',
        params: [
          {
            [`wallet_snap_${this.snapId}`]: {
              ...this.snapInstallationParams
            }
          }
        ]
      })
    } else if (isReinstall) {
      await window.ethereum.request({
        method: 'wallet_installSnaps',
        params: [{
          [`wallet_snap_${this.snapId}`]: {
            ...this.snapInstallationParams
          }
        }]
      })
    }
    const response = await sendSnapMethod(
      { method: 'aptos_getAccount' },
      this.snapId
    ) as PublicAccount
    this._wallet = {
      address: response.address,
      publicKey: response.publicKey,
      isConnected: true
    }
  }

  async signAndSubmitTransaction (transactionPayload: TransactionPayload): Promise<HexEncodedBytes> {
    const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')
    const rawTransaction = await client.generateTransaction(this._wallet.address, transactionPayload as EntryFunctionPayload)
    const signedTx: Uint8Array = await sendSnapMethod({ method: 'aptos_signTransaction', params: { rawTransaction } }, this.snapId)
    const pendingTx = await client.submitTransaction(signedTx)
    return pendingTx.hash
  }
}
