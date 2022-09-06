import { Wallet } from '../interfaces'
import { EntryFunctionPayload, TransactionPayload } from 'aptos/dist/generated'
import { AptosClient } from 'aptos'
import { getAccount } from './getAccount'

export async function signTransaction (wallet: Wallet, transactionPayload: TransactionPayload) {
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: (transactionPayload as EntryFunctionPayload).function
      }
    ]
  })
  if (result) {
    const account = await getAccount(wallet)
    const client = await new AptosClient('https://fullnode.devnet.aptoslabs.com')
    const tx = await client.generateTransaction(account.address(), transactionPayload as EntryFunctionPayload)
    return client.signTransaction(account, tx)
  } else {
    throw new Error('user reject the sign request')
  }
}
