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

export interface getAddressRequest {
  method: 'aptos_getAccount'
}

export interface ConfigureSnapRequest {
  method: 'aptos_configure';
  params: {
    configuration: SnapConfig;
  };
}

export interface getBalanceRequest {
  method: 'aptos_getBalance'
}

export interface signTransactionRequest {
  method: 'aptos_signTransaction',
  params: {
    rawTransaction: Uint8Array
  }
}
export interface signAndSubmitTransactionRequest {
  method: 'aptos_signAndSubmitTransaction',
  params: {
    transactionPayload: EntryFunctionPayload
  }
}

export interface submitTransactionRequest {
  method: 'aptos_submitTransaction',
  params: {
    bcsTxn: Uint8Array
  }
}

export type MetamaskAptosRpcRequest =
  getAddressRequest
  | ConfigureSnapRequest
  | getBalanceRequest
  | signTransactionRequest
  | signAndSubmitTransactionRequest
  | submitTransactionRequest;

type Method = MetamaskAptosRpcRequest['method'];

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

export interface BlockInfo {
  hash: string;
  number: string;
}

export interface Transaction {
  hash: string;
  block: string;
  sender: string;
  destination: string;
  amount: string | number;
  fee: string;
}

export interface PublicAccount {
  address: string,
  publicKey: string,
}
