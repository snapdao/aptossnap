import { SnapConfig } from "@keystonehq/aptosnap-types";
import {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled,
} from "./utils";
import { MetamaskAptosSnap } from "./snap";

const defaultSnapOrigin = "https://bafybeih426v3jpdwnltjfmeefyt4isrogvgzg2wxvryu6itodvb4vzvuma.ipfs.infura-ipfs.io/";

export { MetamaskAptosSnap } from "./snap";
export {
  hasMetaMask,
  isMetamaskSnapsSupported,
  isSnapInstalled,
} from "./utils";

export type SnapInstallationParamNames = "version" | string;

/**
 * Install and enable Aptos snap
 * @param config - SnapConfig
 * @param snapOrigin
 *
 * @return MetamaskAptosSnap - adapter object that exposes snap API
 */
export async function enableAptosSnap(
  config: SnapConfig,
  snapOrigin?: string,
  snapInstallationParams: Record<SnapInstallationParamNames, unknown> = {}
): Promise<MetamaskAptosSnap> {
  const snapId = snapOrigin ?? defaultSnapOrigin;

  // check all conditions
  if (!hasMetaMask()) {
    throw new Error("Metamask is not installed");
  }
  if (!(await isMetamaskSnapsSupported())) {
    throw new Error("Current Metamask version doesn't support snaps");
  }
  if (!config.network) {
    throw new Error("Configuration must at least define network type");
  }

  const isInstalled = await isSnapInstalled(snapId);

  if (!isInstalled) {
    console.log("snap does not installed");
    let snapInstallationParams={version: "latest"};
    // // enable snap
    await window.ethereum.request({
      method: "wallet_enable",
      params: [
        {
          [`wallet_snap_${snapId}`]: {
            ...snapInstallationParams,
          },
        },
      ],
    });
  }

  //await unlockMetamask();

  // create snap describer
  const snap = new MetamaskAptosSnap(snapOrigin || defaultSnapOrigin);
  // set initial configuration
  await (await snap.getMetamaskSnapApi()).setConfiguration(config);
  await snap.getMetamaskSnapApi();
  return snap;
}
