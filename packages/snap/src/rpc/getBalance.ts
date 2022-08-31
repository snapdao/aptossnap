import { Wallet } from '../interfaces'
import { AptosClient, AptosAccount, FaucetClient, CoinClient, APTOS_COIN } from 'aptos'
import { getClient } from '../aptos/client'
import { getCoinClient } from '../aptos/coinClient'

export default async function getBalance (wallet: Wallet, address: string) {
  const client = await getClient()
  const coinClient = getCoinClient(client)
  const account = new AptosAccount(null, address)
  const balance = await coinClient.checkBalance(account)
  return balance.toString()

  // const coinType = APTOS_COIN
  // const typeTag = `0x1::coin::CoinStore<${coinType}>`
  // const resources = await global.fetch(`${NODE_URL}/v1/accounts/${address}/resources`).then(res => res.json())
  // const account = resources.find((r: any) => r.type === typeTag)
  // return account.data.coin.value
}
