import {SnapConfig} from "@keystonehq/aptosnap-types";

export const devnetConfiguartion: SnapConfig = {
  // derivationPath: "",
  network: "devnet",
  // unit: {
  //   decimals: 12,
  //   image: "https://svgshare.com/i/L3o.svg",
  //   symbol: "KSM",
  // },
  rpc: {
    node: "https://devnet.aptoslabs.com",
    faucet: "https://faucet.devnet.aptoslabs.com",
  },
  // wsRpcUrl: "wss://kusama-rpc.polkadot.io/",
};

export const mainnetConfiguartion: SnapConfig = {
  // derivationPath: "",
  network: "mainnet",
  // unit: {
  //   decimals: 12,
  //   image: "https://svgshare.com/i/L3o.svg",
  //   symbol: "KSM",
  // },
  rpc: {
    node: "https://devnet.aptoslabs.com",
    faucet: "https://faucet.devnet.aptoslabs.com",
  },
  // wsRpcUrl: "wss://kusama-rpc.polkadot.io/",
};

export const defaultConfiguration: SnapConfig = devnetConfiguartion;
