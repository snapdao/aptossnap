import { Wallet } from '../interfaces'
import { AptosClient, BCS, TxnBuilderTypes } from 'aptos'
import { getAccount } from './getAccount'
import { getConfiguration } from '../configuration'
import { RawTransaction, TransactionPayloadEntryFunction } from 'aptos/dist/transaction_builder/aptos_types'

export async function signTransaction (wallet: Wallet, rawTransaction: Uint8Array) {
  const account = await getAccount(wallet)
  const d = new BCS.Deserializer(new Uint8Array(Object.values(rawTransaction)))
  const tx = TxnBuilderTypes.RawTransaction.deserialize(d)
  const textContent = (((tx as unknown as RawTransaction).payload) as TransactionPayloadEntryFunction).value;
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: {
          args: textContent.args,
          function_name: textContent.function_name,
          module_name: textContent.module_name
        }
      }
    ]
  })
  if (result) {
    const state = await getConfiguration(wallet)
    const client = await new AptosClient(state.rpc?.node)
    return client.signTransaction(account, tx)
  } else {
    throw new Error('user reject the sign request')
  }
}
