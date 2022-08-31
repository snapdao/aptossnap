import { AptosClient } from 'aptos'
import { AccountsService, BlocksService, EventsService, GeneralService, TablesService, TransactionsService } from 'aptos/dist/generated'
import { defaultConfiguration } from '../configuration/predefined'
import Req from '../util/request'

let client: AptosClient

export function genClient (nodeUrl: string) {
  const aptos = new AptosClient(nodeUrl)
  const request = new Req({
    host: nodeUrl
  })
  const client = aptos.client as any
  client.request = request
  client.accounts = new AccountsService(client.request)
  client.blocks = new BlocksService(client.request)
  client.events = new EventsService(client.request)
  client.general = new GeneralService(client.request)
  client.tables = new TablesService(client.request)
  client.transactions = new TransactionsService(client.request)
  return aptos
}

export async function getClient () {
  if (!client) {
    client = genClient(defaultConfiguration.rpc.node)
  }
  return client
}
