import { OnRpcRequestHandler } from '@metamask/snap-types'
import { getAccount } from './rpc/getAccount'
import { Wallet } from './interfaces'
import { configure } from './rpc/configure'
import getBalance from './rpc/getBalance'
import { signTransaction, submitTransaction } from './rpc/transaction'

declare let wallet: Wallet

let address = ''

// eslint-disable-next-line
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  // const state = await wallet.request({
  //   method: "snap_manageState",
  //   params: ["get"],
  // });
  //
  // if (!state) {
  //   // initialize state if empty and set default config
  //   await wallet.request({
  //     method: "snap_manageState",
  //     params: ["update", EmptyMetamaskState()],
  //   });
  // }
  switch (request.method) {
    case 'aptos_getBalance':
      return await getBalance(wallet, address)
    case 'aptos_signTransaction':
      return await signTransaction(wallet, (request.params as any).from, (request.params as any).to, (request.params as any).amount)
    case 'aptos_submitTransaction':
      return await submitTransaction(wallet, (request.params as any).bcsTxn)
    case 'aptos_configure':
      // const state = (await wallet.request({
      //   method: "snap_manageState",
      //   params: ["get"],
      // })) as MetamaskState;
      // const isInitialConfiguration = state.aptos.config === null;
      // reset api and remove asset only if already configured
      // if (!isInitialConfiguration) {
      //   resetApi();
      // }
      // set new configuration
      return await configure(wallet, 'devnet', {})
    case 'aptos_getAccount':
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      address = await getAccount(
        wallet,
        (request.params as { accountIndex: number }).accountIndex
      )
      return address
    default:
      throw new Error('Method not found.')
  }
}
