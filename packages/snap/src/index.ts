import { OnRpcRequestHandler } from '@metamask/snap-types'
import { getAccount } from './rpc/getAccount'
import { EmptyMetamaskState, Wallet } from './interfaces'
import { configure } from './rpc/configure'
import getBalance from './rpc/getBalance'
import { signTransaction, submitTransaction } from './rpc/transaction'

declare let wallet: Wallet

const address = ''

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
        isValidConfigureRequest(request.params);
      return await configure(
        wallet,
        (request.params as any).configuration
      )
    }
    case 'aptos_getBalance':
      return await getBalance(wallet, address)
    case 'aptos_signTransaction':
      return await signTransaction(wallet, (request.params as {rawTransaction: Uint8Array}).rawTransaction)
    case 'aptos_submitTransaction':
      return await submitTransaction(wallet, (request.params as any).bcsTxn)
    case 'aptos_getAccount':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await getAccount(
        wallet,
        (request.params as { accountIndex: number }).accountIndex
      )
    default:
      throw new Error('Method not found.')
  }
}
