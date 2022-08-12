import {
  MetamaskAptosRpcRequest,
  SnapConfig,
} from "@keystonehq/aptosnap-types";
import { AptosAccount } from "aptos";
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

export async function connect(this: MetamaskAptosSnap): Promise<AptosAccount> {
  return await sendSnapMethod({ method: "aptos_connect" }, this.snapId);
}

export async function configure(
  this: MetamaskAptosSnap,
  configuration: SnapConfig
): Promise<void> {
  return await sendSnapMethod(
    { method: "aptos_configure", params: { configuration: configuration } },
    this.snapId
  );
}
