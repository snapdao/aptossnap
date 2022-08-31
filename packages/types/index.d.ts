import { signTransaction } from '@keystonehq/aptossnap-adapter/src/methods';
import { AptosAccount, BCS, HexString } from "aptos";

export interface getAddressRequest {
  method: "aptos_getAccount",
  params: {
    accountIndex: number
  };
}

export interface ConfigureSnapRequest {
  method: "aptos_configure";
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
    from: HexString
    to: HexString
    amount: number | BigInt
    extraArgs?: {
      coinType?: string
      maxGasAmount?: BCS.Uint64
      gasUnitPrice?: BCS.Uint64
      expireTimestamp?: BCS.Uint64
    }
  }
}

export interface submitTransactionRequest {
  method: 'aptos_submitTransaction',
  params: {
    bcsTxn: Uint8Array
  }
}

export type MetamaskAptosRpcRequest = getAddressRequest | ConfigureSnapRequest | getBalanceRequest | signTransactionRequest | submitTransactionRequest;

type Method = MetamaskAptosRpcRequest["method"];

export interface WalletEnableRequest {
  method: "wallet_enable";
  params: object[];
}

export interface GetSnapsRequest {
  method: "wallet_getSnaps";
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskAptosRpcRequest];
}

export type MetamaskRpcRequest =
  | WalletEnableRequest
  | GetSnapsRequest
  | SnapRpcMethodRequest;

export interface SnapConfig {
  derivationPath?: string;
  network: AptosNetwork;
  rpc?: {
    node: string;
    faucet: string;
  };
}

export type Callback<T> = (arg: T) => void;

export type AptosNetwork = "mainnet" | "devnet";

export interface AptosSnapApi {
  connect(): Promise<AptosAccount>;
  configure(configuration: Partial<SnapConfig>): Promise<void>;
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
