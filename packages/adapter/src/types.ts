// eslint-disable-next-line no-unused-vars
import { SnapConfig, SnapRpcMethodRequest } from '@keystonehq/aptossnap-types'
import { BCS, HexString } from 'aptos'
// import { AptosAccount } from "aptos";

export type PublicAccount = {
    address: string,
    account: string,
}

export interface MetamaskSnapApi {
  connect(accountIndex: number): Promise<PublicAccount>;
  account(accountIndex: number): Promise<PublicAccount>;
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
  submitTransaction(bcsTxn: Uint8Array): Promise<string>
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
