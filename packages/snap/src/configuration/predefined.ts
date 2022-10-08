import { SnapConfig } from '../interfaces'

export const aptosMainnetConfiguration: SnapConfig = {
  network: 'mainnet',
  rpc: {
    node: 'https://fullnode.devnet.aptoslabs.com',
    faucet: 'https://faucet.devnet.aptoslabs.com/'
  }
}

export const aptosDevnetConfiguration: SnapConfig = {
  network: 'devnet',
  rpc: {
    node: 'https://fullnode.devnet.aptoslabs.com',
    faucet: 'https://faucet.devnet.aptoslabs.com/'
  }
}

export const aptosTestnetConfiguration: SnapConfig = {
  network: 'testnet',
  rpc: {
    node: 'https://fullnode.testnet.aptoslabs.com',
    faucet: 'https://faucet.testnet.aptoslabs.com/'
  }
}

export const defaultConfiguration: SnapConfig = aptosTestnetConfiguration
