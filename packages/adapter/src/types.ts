import { HexEncodedBytes, TransactionPayload } from 'aptos/dist/generated'
import { RawTransaction } from 'aptos/dist/transaction_builder/aptos_types'

export interface GetAccountRequest {
  method: 'aptos_getAccount'
}
export interface DisconnectRequest {
  method: 'aptos_disconnect'
}

export interface ConfigureSnapRequest {
  method: 'aptos_configure';
  params: {
    configuration: SnapConfig;
  };
}

export interface GetBalanceRequest {
  method: 'aptos_getBalance'
}

export interface SignTransactionRequest {
  method: 'aptos_signTransaction',
  params: {
    rawTransaction: RawTransaction
  }
}
export interface SignAndSubmitTransactionRequest {
  method: 'aptos_signAndSubmitTransaction',
  params: {
    transactionPayload: TransactionPayload
  }
}

export interface SubmitTransactionRequest {
  method: 'aptos_submitTransaction',
  params: {
    bcsTxn: Uint8Array
  }
}

export type MetamaskAptosRpcRequest = GetAccountRequest | DisconnectRequest
    | ConfigureSnapRequest
    | GetBalanceRequest
    | SignTransactionRequest
    | SignAndSubmitTransactionRequest
    | SubmitTransactionRequest;

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskAptosRpcRequest];
}

export interface PublicAccount {
  address: string,
  publicKey: string,
}

export interface MetamaskSnapApi {
  disconnect(): Promise<void>;
  account(): Promise<PublicAccount>;
  configure(configuration: SnapConfig): Promise<void>;
  getBalance(): Promise<string>;
  signTransaction(rawTransaction: TransactionPayload): Promise<Uint8Array>
  submitTransaction(bcsTxn: Uint8Array): Promise<Uint8Array>
  signAndSubmitTransaction(
    transactionPayload: TransactionPayload
  ): Promise<HexEncodedBytes>
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
