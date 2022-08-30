import { SnapConfig, SnapRpcMethodRequest } from "@keystonehq/aptossnap-types";
// import { AptosAccount } from "aptos";

export interface MetamaskSnapApi {
  getAddress(accountIndex: number): Promise<string>;
  setConfiguration(configuration: SnapConfig): Promise<void>;
}

declare global {
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
