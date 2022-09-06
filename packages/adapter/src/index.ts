import {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled
} from './utils'
import { EntryFunctionPayload, HexEncodedBytes, TransactionPayload } from 'aptos/dist/generated'
import { AptosClient } from 'aptos'
import { PublicAccount, SnapConfig } from './types'

const defaultSnapOrigin = 'npm:@keystonehq/aptossnap'

export * from './utils'

export type SnapInstallationParamNames = 'version' | string;

export default class WalletAdapter {
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
    this.snapInstallationParams = snapInstallationParams
  }

  connected (): boolean {
    return !!this._wallet?.isConnected
  }

  async connect (): Promise<void> {
    try {
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
      // const isReinstall = true
      if (!isInstalled) {
        await window.ethereum.request({
          method: 'wallet_enable',
          params: [
            {
              wallet_snap: {
                [this.snapId]: this.snapInstallationParams
              }
            }
          ]
        })
      }
      const result: PublicAccount = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          this.snapId,
          {
            method: 'aptos_getAccount'
          }
        ]
      })
      this._wallet = {
        address: result.address,
        publicKey: result.publicKey,
        isConnected: true
      }
    } catch (e) {
      console.log('connect failed', e)
    }
  }

  publicAccount (): PublicAccount {
    return {
      publicKey: this._wallet?.publicKey || null,
      address: this._wallet?.address || null
    }
  }

  async signAndSubmitTransaction (transactionPayload: TransactionPayload): Promise<HexEncodedBytes> {
    try {
      const client = new AptosClient('https://fullnode.devnet.aptoslabs.com')
      const rawTransaction = await client.generateTransaction(this._wallet.address, transactionPayload as EntryFunctionPayload)
      console.log({rawTransaction})
      const signedTx: Uint8Array = await window.ethereum.request({
        method: 'wallet_invokeSnap',
        params: [
          this.snapId,
          {
            method: 'aptos_signTransaction',
            params: { rawTransaction }
          }
        ]
      })
      const pendingTx = await client.submitTransaction(signedTx)
      return pendingTx.hash
    } catch (e) {
      console.log('signAndSubmitTransaction', e)
      return '0x'
    }
  }
}
