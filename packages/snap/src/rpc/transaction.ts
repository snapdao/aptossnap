import { Wallet } from '../interfaces'
import { AptosAccount, AptosClient, HexString } from 'aptos'
import { EntryFunctionPayload } from 'aptos/dist/generated'

export async function signTransaction (wallet: Wallet, rawTransaction: Uint8Array, account: AptosAccount, client: AptosClient) {
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: 'transaction'
      }
    ]
  })
  if (result) {
    return account.signHexString(HexString.fromUint8Array(rawTransaction))
  } else {
    throw new Error('user reject the sign request')
  }
}

export async function signAndSubmitTransaction (wallet: Wallet, transactionPayload: EntryFunctionPayload, account: AptosAccount, client: AptosClient) {
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: transactionPayload.function
      }
    ]
  })
  if (result) {
    try {
      const tx = await client.generateTransaction(account.address(), transactionPayload, {
        expiration_timestamp_secs: (Math.floor(Date.now() / 1000) + 1000).toString()
      })
      return await client.signTransaction(account, tx)
    } catch (e) {
      console.log('signAndSubmitTransaction error----------------', e)
      return 'error'
    }
  } else {
    throw new Error('user reject the sign request')
  }
}

export async function submitTransaction (wallet: Wallet, bcsTxn: Uint8Array, account: AptosAccount, client: AptosClient) {
  const pendingTransaction = await client.submitSignedBCSTransaction(bcsTxn)
  return pendingTransaction
}
