import { AptosClient, CoinClient } from 'aptos'

export function getCoinClient (client: AptosClient) {
  return new CoinClient(client)
}
