import { EntryFunctionPayload } from 'aptos/dist/generated'

export type AptosNetwork = 'mainnet' | 'devnet';

export interface SnapConfig {
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

export interface GetBalanceRequest {
  method: 'aptos_getBalance'
}

export interface SignTransactionRequest {
  method: 'aptos_signTransaction',
  params: {
    rawTransaction: Uint8Array
  }
}
export interface SignAndSubmitTransactionRequest {
  method: 'aptos_signAndSubmitTransaction',
  params: {
    transactionPayload: EntryFunctionPayload
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
