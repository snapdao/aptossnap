import { AptosAccount } from 'aptos'
import { EntryFunctionPayload } from 'aptos/dist/generated'

export type AptosNetwork = 'mainnet' | 'devnet';

export interface SnapConfig {
  network: AptosNetwork;
  account?: AptosAccount
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

export interface WalletEnableRequest {
  method: 'wallet_enable';
  params: object[];
}

export interface GetSnapsRequest {
  method: 'wallet_getSnaps';
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskAptosRpcRequest];
}

export type MetamaskRpcRequest =
  | WalletEnableRequest
  | GetSnapsRequest
  | SnapRpcMethodRequest;

export type Callback<T> = (arg: T) => void;

export interface AptosSnapApi {
  connect (): Promise<AptosAccount>;

  configure (configuration: Partial<SnapConfig>): Promise<void>;
}

export interface PublicAccount {
  address: string,
  publicKey: string,
}
