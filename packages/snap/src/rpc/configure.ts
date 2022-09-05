import {AptosNetwork, SnapConfig} from '@keystonehq/aptossnap-types'
import { MetamaskState, Wallet } from '../interfaces'
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
  const state = (await wallet.request({
    method: 'snap_manageState',
    params: ['get']
  })) as MetamaskState
  state.aptos.configuration = configuration
  await wallet.request({
    method: 'snap_manageState',
    params: ['update', state]
  })
  const client = getClientFromConfig(configuration)
  return {
    client,
    snapConfig: configuration
  }
}
