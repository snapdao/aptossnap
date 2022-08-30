import { SnapConfig, SnapRpcMethodRequest } from "@keystonehq/aptossnap-types";
import { BCS, HexString } from 'aptos';
// import { AptosAccount } from "aptos";

export interface MetamaskSnapApi {
  getAddress(): Promise<string>;
  setConfiguration(configuration: SnapConfig): Promise<void>;
  getBalance(): Promise<string>;
  signTransaction(
    from: HexString,
    to: HexString,
    amount: number | BigInt,
    extraArgs?: {
      coinType?: string
      maxGasAmount?: BCS.Uint64
      gasUnitPrice?: BCS.Uint64
      expireTimestamp?: BCS.Uint64
    }
  ): Promise<string>
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
