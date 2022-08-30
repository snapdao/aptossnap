import { SnapConfig } from "@keystonehq/aptossnap-types";

export type AptosNetwork = "devnet" | "mainnet";

export interface Wallet {
  request(options: { method: string; params?: unknown[] | unknown}): unknown;
}

export type MetamaskState = {
  aptos: {
    config: SnapConfig;
  };
};
export const EmptyMetamaskState: () => MetamaskState = () => ({
  aptos: { config: null },
});
