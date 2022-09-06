import { OnRpcRequestHandler } from '@metamask/snap-types'
import { getAccount } from './rpc/getAccount'
import { EmptyMetamaskState, Wallet } from './interfaces'
import { configure } from './rpc/configure'
import { signTransaction } from './rpc/transaction'
import { isValidConfigureRequest } from './util/params'

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

  switch (request.method) {
    case 'aptos_configure': {
      isValidConfigureRequest(request.params)
      return await configure(
        wallet,
        (request.params as any).configuration
      )
    }

    case 'aptos_signTransaction': {
      const result = await signTransaction(wallet, (request.params as any).rawTransaction)
      console.log('signTransaction', result)
      return result
    }
    case 'aptos_getAccount': {
      const account = await getAccount(wallet)
      return {
        address: account.address().hex(),
        publicKey: account.signingKey.publicKey.toString()
      }
    }
    case 'aptos_disconnect': {
      return await wallet.request({
        method: 'snap_manageState',
        params: ['update', EmptyMetamaskState()]
      })
    }
    default:
      throw new Error('Method not found.')
  }
}
