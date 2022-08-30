import { Wallet } from "../interfaces"
import { AptosClient, AptosAccount, FaucetClient, CoinClient, APTOS_COIN } from "aptos"

const NODE_URL = 'https://fullnode.devnet.aptoslabs.com'
const FAUCET_URL = 'https://faucet.devnet.aptoslabs.com'

export default async function getBalance (wallet: Wallet, address: string) {
  const client = new AptosClient(NODE_URL);
  (client.client.accounts.httpRequest as any).request = (conf: any) => {
    global.fetch(`${NODE_URL}${client.client.accounts.httpRequest.config.BASE}${conf.url}`, conf).then(res => res.json())
  }
  const coinClient = new CoinClient(client)
  const account = new AptosAccount(null, address)
  const balance = await coinClient.checkBalance(account)
  return balance

  // const coinType = APTOS_COIN
  // const typeTag = `0x1::coin::CoinStore<${coinType}>`
  // const resources = await global.fetch(`${NODE_URL}/v1/accounts/${address}/resources`).then(res => res.json())
  // const account = resources.find((r: any) => r.type === typeTag)
  // return account.data.coin.value
}
