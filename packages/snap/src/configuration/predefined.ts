import { SnapConfig } from "@keystonehq/aptosnap-types";

export const aptosMainnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/637'/0'/0/0",
  network: "mainnet",
  rpc: {
    node: "",
    faucet: "",
  },
};

// devnet configuration replaces testnet for now
export const aptosDevnetConfiguration: SnapConfig = {
  derivationPath: "m/44'/637'/0'/0/0",
  network: "devnet",
  rpc: {
    node: "https://devnet.aptoslabs.com/",
    faucet: `https://faucet.devnet.aptoslabs.com/`,
  },
};

export const defaultConfiguration: SnapConfig = aptosMainnetConfiguration;
