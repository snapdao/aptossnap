import { Wallet } from '../interfaces'
import { AptosAccount, AptosClient, HexString } from 'aptos'
import { getCoinClient } from '../aptos/coinClient'

export default async function getBalance (wallet: Wallet, address: HexString, client: AptosClient) {
  const coinClient = getCoinClient(client)
  const account = new AptosAccount(null, address)
  const balance = await coinClient.checkBalance(account)
  return balance.toString()
}
