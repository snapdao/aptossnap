import { OnRpcRequestHandler } from '@metamask/snap-types'
import { getAccount } from './rpc/getAccount'
import { EmptyMetamaskState, Wallet } from './interfaces'
import { configure, ConfigureResponse } from './rpc/configure'
import getBalance from './rpc/getBalance'
import { signAndSubmitTransaction, signTransaction, submitTransaction } from './rpc/transaction'
import { isValidConfigureRequest } from './util/params'
import { getClient } from './aptos/client'

declare let wallet: Wallet

// eslint-disable-next-line
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  const state = await wallet.request({
    method: 'snap_manageState',
    params: ['get']
  })
  if (!state) {
    await wallet.request({
      method: 'snap_manageState',
      params: ['update', EmptyMetamaskState()]
    })
  }
  const client = await getClient(wallet)
  const account = await getAccount(wallet)
  switch (request.method) {
    case 'aptos_configure': {
      isValidConfigureRequest(request.params)
      return await configure(
        wallet,
        (request.params as any).configuration
      )
    }
    case 'aptos_getBalance': {
      return await getBalance(wallet, account.address(), client)
    }
    case 'aptos_signTransaction': {
      let rawTransaction
      rawTransaction = (request.params as any).rawTransaction
      if (typeof rawTransaction === 'object') {
        rawTransaction = Object.values(rawTransaction)
      }
      return await signTransaction(wallet, rawTransaction, account, client)
    }
    case 'aptos_signAndSubmitTransaction':
      return await signAndSubmitTransaction(wallet, (request.params as any).transactionPayload, account, client)
    case 'aptos_submitTransaction':
      return await submitTransaction(wallet, (request.params as any).bcsTxn, account, client)
    case 'aptos_getAccount': {
      return {
        address: account.address().hex(),
        publicKey: account.signingKey.publicKey.toString()
      }
    }
    case 'aptos_disconnect': {
      console.log("disconnect is called")
      return await wallet.request({
        method: 'snap_manageState',
        params: ['update', EmptyMetamaskState()]
      })
    }
    default:
      throw new Error('Method not found.')
  }
}
