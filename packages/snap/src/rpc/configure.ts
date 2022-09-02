import { SnapConfig } from '@keystonehq/aptossnap-types'
import { AptosNetwork, MetamaskState, Wallet } from '../interfaces'
import deepmerge from 'deepmerge'
import { getDefaultConfiguration } from '../configuration'
import { getClientFromConfig } from '../aptos/client'
import { AptosClient } from 'aptos'

export interface ConfigureResponse {
  client: AptosClient;
  snapConfig: SnapConfig;
}

export async function configure (
  wallet: Wallet,
  networkName?: AptosNetwork,
  overrides?: unknown
): Promise<ConfigureResponse> {
  const defaultConfig = getDefaultConfiguration(networkName)
  const configuration = overrides
    ? deepmerge(defaultConfig, overrides)
    : defaultConfig
  await wallet.request({
    method: 'snap_manageState',
    params: ['update', configuration]
  })
  const state = (await wallet.request({
    method: 'snap_manageState',
    params: ['get']
  })) as MetamaskState
  const client = getClientFromConfig(configuration)
  return {
    client,
    snapConfig: state.aptos.configuration
  }
}
