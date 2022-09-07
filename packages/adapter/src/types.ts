import { TransactionPayload } from 'aptos/dist/generated'

export type AptosNetwork = 'mainnet' | 'devnet';

export type SnapConfig = {
  network: AptosNetwork;
  rpc?: {
    node: string,
    faucet: string,
  }
}

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

export interface SignAndSubmitTransactionRequest {
  method: 'aptos_signAndSubmitTransaction',
  params: {
    transactionPayload: TransactionPayload
  }
}

export type MetamaskAptosRpcRequest =
    GetAccountRequest
    | DisconnectRequest
    | ConfigureSnapRequest
    | SignAndSubmitTransactionRequest

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskAptosRpcRequest];
}

export type PublicAccount = {
  address: string;
  publicKey: string;
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
