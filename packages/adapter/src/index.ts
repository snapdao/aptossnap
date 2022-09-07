import {
  getConfigurationByNetwork,
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled
} from './utils'
import { EntryFunctionPayload, HexEncodedBytes, TransactionPayload } from 'aptos/dist/generated'
import { AptosClient, BCS } from 'aptos'
import { PublicAccount, SnapConfig } from './types'

const defaultSnapOrigin = 'npm:@keystonehq/aptossnap'

export * from './utils'

export type SnapInstallationParamNames = 'version' | string;

export default class WalletAdapter {
  protected readonly snapId: string;
  protected readonly config: SnapConfig;
  protected snapInstallationParams: Record<SnapInstallationParamNames, unknown>;
  protected _wallet: any | null;
  protected _connecting: boolean;

  constructor (config: SnapConfig,
    snapOrigin?: string,
    snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {
      version: 'latest'
    }) {
    this._connecting = false

    this.config = config
    this.snapId = snapOrigin ?? defaultSnapOrigin
    this.snapInstallationParams = snapInstallationParams
  }

  get connecting (): boolean {
    return this._connecting
  }

  get connected (): boolean {
    return !!this._wallet?.isConnected
  }

  get publicAccount (): PublicAccount {
    return {
      publicKey: this._wallet?.publicKey || null,
      address: this._wallet?.address || null
    }
  }

  async connect (): Promise<void> {
    try {
      if (this.connected || this.connecting) return

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

      this._connecting = true

      const isInstalled = await isSnapInstalled(this.snapId)

      if (this.connected) {
        await this.disconnect()
      }

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
      throw e
    } finally {
      this._connecting = false
    }
  }

  async disconnect (): Promise<void> {
    const wallet = this._wallet
    if (wallet) {
      this._wallet = null
    }
  }

  private getClient (): AptosClient {
    const nodeUrl = getConfigurationByNetwork(this.config.network).rpc.node
    return new AptosClient(nodeUrl)
  }

  async signAndSubmitTransaction (transactionPayload: TransactionPayload): Promise<HexEncodedBytes> {
    const client = this.getClient()
    const rawTransaction = await client.generateTransaction(this._wallet.address, transactionPayload as EntryFunctionPayload)
    const s = new BCS.Serializer()
    rawTransaction.serialize(s)
    const signedTx: unknown = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        this.snapId,
        {
          method: 'aptos_signTransaction',
          params: { rawTransaction: s.getBytes() }
        }
      ]
    })
    const pendingTx = await client.submitTransaction(new Uint8Array(Object.values(signedTx as Object)))
    return pendingTx.hash
  }
}
