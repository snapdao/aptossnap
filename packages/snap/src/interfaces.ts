import { SnapConfig } from '@keystonehq/aptossnap-types'
import { defaultConfiguration } from './configuration/predefined'

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
