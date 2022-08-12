import { AptosAccount } from "aptos";

export interface connectRequest {
  method: "aptos_connect";
}

export interface ConfigureRequest {
  method: "aptos_configure";
  params: {
    configuration: SnapConfig;
  };
}

export type MetamaskAptosRpcRequest = connectRequest | ConfigureRequest;

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
  derivationPath: string;
  network: AptosNetwork;
  rpc: {
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
