import { Wallet } from '../interfaces'
import { getClient } from '../aptos/client'
import { AptosAccount, APTOS_COIN, BCS, HexString, TransactionBuilder } from 'aptos'
import { getCoinClient } from '../aptos/coinClient'

export async function signTransaction (wallet: Wallet, address: HexString, toAddress: HexString, amount: number | BigInt, extraArgs?: {
  coinType?: string
  maxGasAmount?: BCS.Uint64
  gasUnitPrice?: BCS.Uint64
  expireTimestamp?: BCS.Uint64
}) {
  const client = await getClient()
  const coinClient = getCoinClient(client)
  const account = new AptosAccount(null, address)
  const payload = coinClient.transactionBuilder.buildTransactionPayload('0x1::coin::transfer', [APTOS_COIN], [toAddress, amount])
  const rawTransaction = await client.generateRawTransaction(address, payload, extraArgs)
  const signData = client.signTransaction(account, rawTransaction)
  return signData
}

export async function submitTransaction (wallet: Wallet, bcsTxn: Uint8Array) {
  const client = await getClient()
  const pendingTransaction = await client.submitSignedBCSTransaction(bcsTxn)
  return pendingTransaction
}
