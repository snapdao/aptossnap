import { Wallet } from '../interfaces'
import { AptosClient, BCS, TxnBuilderTypes } from 'aptos'
import { getAccount } from './getAccount'

export async function signTransaction (wallet: Wallet, rawTransaction: Uint8Array) {
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: rawTransaction.toString()
      }
    ]
  })
  if (result) {
    const account = await getAccount(wallet)
    const d = new BCS.Deserializer(new Uint8Array(Object.values(rawTransaction)))
    const tx = TxnBuilderTypes.RawTransaction.deserialize(d)
    const client = await new AptosClient('https://fullnode.devnet.aptoslabs.com')
    return client.signTransaction(account, tx)
  } else {
    throw new Error('user reject the sign request')
  }
}
