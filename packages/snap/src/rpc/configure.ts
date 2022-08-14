import deepmerge from "deepmerge";
import { SnapConfig } from "@keystonehq/aptossnap-types";
import { MetamaskState, Wallet } from "../interfaces";
import { getDefaultConfiguration } from "../configuration";

export async function configure(
  wallet: Wallet,
  networkName: string,
  overrides: unknown
): Promise<SnapConfig> {
  const defaultConfig = getDefaultConfiguration(networkName);
  const configuration = deepmerge(defaultConfig, overrides);
  const state = (await wallet.request({
    method: "snap_manageState",
    params: ["get"],
  })) as MetamaskState;
  state.aptos.config = configuration;
  wallet.request({
    method: "snap_manageState",
    params: ["update", state],
  });

  return configuration;
}
