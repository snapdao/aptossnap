import { MetamaskState, Wallet } from '../interfaces'
import { getClient } from '../aptos/client'
import { getPrivKey } from './getAccount'
import { AptosAccount, HexString } from 'aptos'

export async function signTransaction (wallet: Wallet, rawTransaction: Uint8Array) {
  // const client = await getClient()
  // const coinClient = getCoinClient(client)
  // const account = new AptosAccount(null, address)
  // const payload = coinClient.transactionBuilder.buildTransactionPayload('0x1::coin::transfer', [APTOS_COIN], [toAddress, amount])
  // const rawTransaction = await client.generateRawTransaction(address, payload, extraArgs)
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?',
        description: 'Please verify this ongoing Transaction Detail',
        textAreaContent: rawTransaction
      }
    ]
  })
  if (result) {
    const state = (await wallet.request({
      method: 'snap_manageState',
      params: ['get']
    })) as MetamaskState
    const accountIndex = state.aptos.config.accountIndex
    const privateKey = await getPrivKey(wallet, accountIndex)
    const account = new AptosAccount(privateKey)
    return account.signHexString(HexString.fromUint8Array(rawTransaction))
  } else {
    throw new Error('user reject the sign request')
  }
}

export async function submitTransaction (wallet: Wallet, bcsTxn: Uint8Array) {
  const client = await getClient()
  const pendingTransaction = await client.submitSignedBCSTransaction(bcsTxn)
  return pendingTransaction
}
