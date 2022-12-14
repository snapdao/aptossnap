import { SignMessageRequestPayload, Wallet } from '../interfaces'
import { AptosClient, BCS, TxnBuilderTypes } from 'aptos'
import { getAccount } from './getAccount'
import { getConfiguration } from '../configuration'

export async function signTransaction (wallet: Wallet, rawTransaction: Uint8Array) {
  const account = await getAccount(wallet)
  const d = new BCS.Deserializer(new Uint8Array(Object.values(rawTransaction)))
  const tx = TxnBuilderTypes.RawTransaction.deserialize(d)
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Transaction?'
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

export async function signMessage (wallet: Wallet, message: Partial<SignMessageRequestPayload>) {
  const account = await getAccount(wallet)
  const result = await wallet.request({
    method: 'snap_confirm',
    params: [
      {
        prompt: 'Sign Aptos Message?',
        description: 'Please verify this message  Detail',
        textAreaContent: message.fullMessage
      }
    ]
  })
  if (result) {
    const messageToSign = Buffer.from(message.fullMessage)
    return account.signBuffer(messageToSign).noPrefix()
  } else {
    throw new Error('user reject the sign request')
  }
}
