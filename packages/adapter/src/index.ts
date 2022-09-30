import {
  getConfigurationByNetwork,
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled
} from './utils'
import {
  PublicAccount,
  SignMessagePayload,
  SignMessageRequestPayload,
  SignMessageResponse,
  SnapConfig
} from './types'
import { AptosClient, BCS } from 'aptos'
import { EntryFunctionPayload, PendingTransaction } from 'aptos/src/generated'

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

  isConnected (): Promise<boolean> {
    return Promise.resolve(!!this._wallet?.isConnected)
  }

  account (): Promise<PublicAccount> {
    if (this.connecting) {
      throw new Error('Already in connecting status')
    }
    if (!this.isConnected()) {
      throw new Error('Connect first')
    } else {
      return Promise.resolve({
        publicKey: this._wallet?.publicKey || null,
        address: this._wallet?.address || null
      })
    }
  }

  async connect (): Promise<PublicAccount> {
    try {
      if (this.connecting) {
        throw new Error('Already in connecting status')
      }
      this._connecting = true
      // check all conditions
      if (!hasMetaMask()) {
        throw new Error('Metamask is not installed')
      }
      if (!(await isMetamaskSnapsSupported())) {
        throw new Error("Current Metamask version doesn't support snaps")
      }

      this._connecting = true

      const isInstalled = await isSnapInstalled(this.snapId)

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
      if (!this.config.network) {
        throw new Error('Configuration must at least define network type')
      } else {
        // sync the snap network
        await window.ethereum.request({
          method: 'wallet_invokeSnap',
          params: [this.snapId, {
            method: 'aptos_configure',
            params: {
              configuration: {
                network: this.config.network
              }
            }
          }]
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
      return result
    } finally {
      this._connecting = false
    }
  }

  async disconnect (): Promise<void> {
    const wallet = this._wallet
    // clean up snap state
    await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        this.snapId,
        {
          method: 'aptos_disconnect'
        }
      ]
    })
    if (wallet) {
      this._wallet = null
    }
  }

  private getClient (): AptosClient {
    const nodeUrl = getConfigurationByNetwork(this.config.network).rpc.node
    return new AptosClient(nodeUrl)
  }

  async signAndSubmitTransaction (transactionPayload: EntryFunctionPayload, options: any): Promise<PendingTransaction> {
    const client = this.getClient()
    const rawTransaction = await client.generateTransaction(this._wallet.address, transactionPayload, options)
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
    return client.submitTransaction(new Uint8Array(Object.values(signedTx as Object)))
  }

  async signTransaction (transactionPayload: EntryFunctionPayload): Promise<Uint8Array> {
    const client = this.getClient()
    const rawTransaction = await client.generateTransaction(this._wallet.address, transactionPayload)
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
    return new Uint8Array(Object.values(signedTx as Object))
  }

  async signMessage (payload: SignMessagePayload): Promise<SignMessageResponse> {
    const client = this.getClient()
    const prefix = 'APTOS'
    let fullMessage = prefix
    const address = payload.address ? this._wallet.address : undefined
    const chainId = payload.chainId ? await client.getChainId() : undefined
    const application = payload.application ? window.location.hostname : undefined
    if (address) {
      fullMessage += `\naddress: ${address}`
    }
    if (chainId) {
      fullMessage += `\nchainId: ${chainId}`
    }
    if (application) {
      fullMessage += `\napplication: ${application}`
    }
    fullMessage += `\nmessage: ${payload.message}`
    fullMessage += `\nnonce: ${payload.nonce}`

    const rawMessage: SignMessageRequestPayload = {
      prefix,
      address,
      chainId,
      application,
      nonce: payload.nonce,
      message: payload.message,
      fullMessage
    }
    Object.keys(rawMessage).forEach((key) => rawMessage[key as keyof typeof rawMessage] === undefined && delete rawMessage[key as keyof typeof rawMessage])
    const signature: string = await window.ethereum.request({
      method: 'wallet_invokeSnap',
      params: [
        this.snapId,
        {
          method: 'aptos_signMessage',
          params: { message: rawMessage }
        }
      ]
    })
    return {
      ...rawMessage,
      signature: `${signature}${Buffer.from(fullMessage).toString('hex')}`
    }
  }
}
