import { MetamaskState, Wallet } from "../interfaces";
import {
  defaultConfiguration,
  devnetConfiguartion,
  mainnetConfiguartion,
} from "./predefined";
import {SnapConfig} from "@keystonehq/aptosnap-types";

export function getDefaultConfiguration(networkName: string): SnapConfig {
  switch (networkName) {
    case "devnet":
      console.log("devnet configuration selected");
      return devnetConfiguartion;
    case "mainnet":
      console.log("mainnet configuration selected");
      return mainnetConfiguartion;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(wallet: Wallet): Promise<SnapConfig> {
  const state = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  if (!state || !state.aptos.config) {
    return defaultConfiguration;
  }
  return state.aptos.config;
}
