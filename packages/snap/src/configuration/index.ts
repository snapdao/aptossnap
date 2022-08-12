import { SnapConfig } from "@keystonehq/aptosnap-types";
import { SnapProvider } from "@metamask/snap-types";
import { MetamaskState } from "../interfaces";
import {
  defaultConfiguration,
  aptosMainnetConfiguration,
  aptosDevnetConfiguration,
} from "./predefined";

export function getDefaultConfiguration(networkName?: string): SnapConfig {
  switch (networkName) {
    case "f":
      console.log("Filecoin mainnett network selected");
      return aptosMainnetConfiguration;
    case "t":
      console.log("Filecoin testnet network selected");
      return aptosDevnetConfiguration;
    default:
      return defaultConfiguration;
  }
}

export async function getConfiguration(
  wallet: SnapProvider
): Promise<SnapConfig> {
  const state = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  if (!state || !state.filecoin.config) {
    return defaultConfiguration;
  }
  return state.filecoin.config;
}
