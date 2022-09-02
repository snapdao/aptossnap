import { AptosClient } from 'aptos'
import { AccountsService, BlocksService, EventsService, GeneralService, TablesService, TransactionsService } from 'aptos/dist/generated'
import Req from '../util/request'
import { SnapConfig } from '@keystonehq/aptossnap-types'

let client: AptosClient

export function genClient (nodeUrl: string): AptosClient {
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

export function getClientFromConfig (configuration: SnapConfig): AptosClient {
  if (!client) {
    client = genClient(configuration.rpc.node)
  }
  return client
}
