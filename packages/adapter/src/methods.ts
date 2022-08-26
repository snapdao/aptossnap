import {
  MetamaskAptosRpcRequest,
  SnapConfig,
} from "@keystonehq/aptossnap-types";
import { MetamaskAptosSnap } from "./snap";

async function sendSnapMethod<T>(
  request: MetamaskAptosRpcRequest,
  snapId: string
): Promise<T> {
  return await window.ethereum.request({
    method: snapId,
    params: [request],
  });
}

export async function getAddress(this: MetamaskAptosSnap): Promise<string> {
  return await sendSnapMethod({ method: "aptos_getAddress" }, this.snapId);
}

export async function setConfiguration(
  this: MetamaskAptosSnap,
  config: SnapConfig
): Promise<void> {
  await sendSnapMethod(
    { method: "aptos_configure", params: { configuration: config } },
    this.snapId
  );
}

export async function getBalance(this: MetamaskAptosSnap): Promise<string> {
  return await sendSnapMethod({ method: 'aptos_getBalance' }, this.snapId)
}

// export async function configure(
//   this: MetamaskAptosSnap,
//   configuration: SnapConfig
// ): Promise<void> {
//   return await sendSnapMethod(
//     { method: "aptos_configure", params: { configuration: configuration } },
//     this.snapId
//   );
// }
