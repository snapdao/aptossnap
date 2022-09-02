import {PublicAccount, SnapConfig, SnapRpcMethodRequest} from '@keystonehq/aptossnap-types'

export interface MetamaskSnapApi {
  connect(): Promise<PublicAccount>;
  account(): Promise<PublicAccount>;
  configure(configuration: SnapConfig): Promise<void>;
  getBalance(): Promise<string>;
  signTransaction(rawTransaction: Uint8Array): Promise<Uint8Array>
  submitTransaction(bcsTxn: Uint8Array): Promise<Uint8Array>
}

declare global {
    // eslint-disable-next-line no-unused-vars
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      isUnlocked: Promise<boolean>;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: <T>(
        request: SnapRpcMethodRequest | { method: string; params?: any[] }
      ) => Promise<T>;
      on: (eventName: unknown, callback: unknown) => unknown;
    };
  }
}
