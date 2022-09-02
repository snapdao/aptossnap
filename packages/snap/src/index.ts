import { OnRpcRequestHandler } from '@metamask/snap-types'
import { getAccount } from './rpc/getAccount'
import { EmptyMetamaskState, Wallet } from './interfaces'
import { configure, ConfigureResponse } from './rpc/configure'
import getBalance from './rpc/getBalance'
import { signTransaction, submitTransaction } from './rpc/transaction'
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
      const resp: ConfigureResponse = await configure(
        wallet,
        (request.params as any).configuration
      )
      return resp
    }
    case 'aptos_getBalance': {
      return await getBalance(wallet, account.address(), client)
    }
    case 'aptos_signTransaction':
      return await signTransaction(wallet, (request.params as {rawTransaction: Uint8Array}).rawTransaction, account, client)
    case 'aptos_submitTransaction':
      return await submitTransaction(wallet, (request.params as any).bcsTxn, account, client)
    case 'aptos_getAccount': {
      return {
        address: account.address().hex(),
        publicKey: account.signingKey.publicKey.toString()
      }
    }
    default:
      throw new Error('Method not found.')
  }
}
