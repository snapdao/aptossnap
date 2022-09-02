import { SnapConfig } from '@keystonehq/aptossnap-types'

export const aptosMainnetConfiguration: SnapConfig = {
  network: 'mainnet',
  rpc: {
    node: 'https://devnet.aptoslabs.com',
    faucet: 'https://devnet.aptoslabs.com'
  }
}

export const aptosTestnetConfiguration: SnapConfig = {
  network: 'devnet',
  rpc: {
    node: 'https://devnet.aptoslabs.com',
    faucet: 'https://devnet.aptoslabs.com'
  }
}

export const defaultConfiguration: SnapConfig = aptosTestnetConfiguration
