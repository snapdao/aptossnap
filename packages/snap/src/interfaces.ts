import { defaultConfiguration } from './configuration/predefined'

export type AptosNetwork = 'mainnet' | 'devnet';

export interface SnapConfig {
  network: AptosNetwork;
  rpc?: {
    node: string,
    faucet: string,
  }
}

export interface Wallet {
  request(options: { method: string; params?: unknown[]}): unknown;
}

export type MetamaskState = {
  aptos: {
    configuration: SnapConfig;
  };
};
export const EmptyMetamaskState: () => MetamaskState = () => ({
  aptos: {
    configuration: defaultConfiguration
  }
})
