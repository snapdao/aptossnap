import { MetamaskState, SnapConfig, Wallet } from '../interfaces'
import { aptosMainnetConfiguration, aptosTestnetConfiguration, defaultConfiguration } from './predefined'

export function getDefaultConfiguration (networkName?: string): SnapConfig {
  switch (networkName) {
    case 'mainnet':
      return aptosMainnetConfiguration
    case 'devnet':
      return aptosTestnetConfiguration
    default:
      return defaultConfiguration
  }
}

export async function getConfiguration (wallet: Wallet): Promise<SnapConfig> {
  const state = (await wallet.request({
    method: 'snap_manageState',
    params: ['get']
  })) as MetamaskState
  if (!state || !state.aptos.configuration) {
    return defaultConfiguration
  }
  return state.aptos.configuration
}
