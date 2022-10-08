import { EntryFunctionPayload } from 'aptos/src/generated'

export type AptosNetwork = 'mainnet' | 'devnet' | 'testnet';

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

export interface SignTransactionRequest {
  method: 'aptos_signTransaction',
  params: {
    transactionPayload: EntryFunctionPayload
  }
}

export interface SignMessageRequest {
  method: 'aptos_signMessage',
  params: {
    message: string
  }
}

export type MetamaskAptosRpcRequest =
    GetAccountRequest
    | DisconnectRequest
    | ConfigureSnapRequest
    | SignMessageRequest
    | SignTransactionRequest

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

export interface SignMessagePayload {
  address?: boolean,
  application?: boolean,
  chainId?: boolean,
  message: string
  nonce: string
}

export interface SignMessageRequestPayload {
  address?: string;
  application?: string;
  chainId?: number,
  message: string,
  nonce: string,
  prefix: string,
  fullMessage: string,
}
export interface SignMessageResponse extends SignMessageRequestPayload {
  signature: string,
}
