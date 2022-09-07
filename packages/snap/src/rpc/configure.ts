import { AptosNetwork, MetamaskState, SnapConfig, Wallet } from '../interfaces'
import deepmerge from 'deepmerge'
import { getDefaultConfiguration } from '../configuration'

export async function configure (
  wallet: Wallet,
  networkName?: AptosNetwork,
  overrides?: unknown
): Promise<SnapConfig> {
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
  return configuration
}
