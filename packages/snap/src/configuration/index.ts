import { SnapConfig } from '@keystonehq/aptossnap-types'
import {MetamaskState, Wallet} from '../interfaces'
import {aptosMainnetConfiguration, aptosTestnetConfiguration, defaultConfiguration} from './predefined'

export function getDefaultConfiguration (networkName?: string): SnapConfig {
  switch (networkName) {
    case 'mainnet':
      console.log('Aptos mainnet network selected')
      return aptosMainnetConfiguration
    case 'devnet':
      console.log('Aptos testnet network selected')
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
