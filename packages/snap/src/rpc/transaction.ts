import { Wallet } from '../interfaces'
// eslint-disable-next-line no-unused-vars
import { getPrivKey } from './getAccount'
import { AptosAccount, AptosClient, HexString } from 'aptos'

export async function signTransaction (wallet: Wallet, rawTransaction: Uint8Array, account: AptosAccount, client: AptosClient) {
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: "transaction"
      }
    ]
  })
  if (result) {
    return account.signHexString(HexString.fromUint8Array(rawTransaction))
  } else {
    throw new Error('user reject the sign request')
  }
}

export async function submitTransaction (wallet: Wallet, bcsTxn: Uint8Array, account: AptosAccount, client: AptosClient) {
  const pendingTransaction = await client.submitSignedBCSTransaction(bcsTxn)
  return pendingTransaction
}
