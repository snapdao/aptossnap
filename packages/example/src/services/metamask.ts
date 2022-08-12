// import { web3EnablePromise } from "@polkadot/extension-dapp";
// import { InjectedMetamaskExtension } from "@chainsafe/metamask-polkadot-adapter/src/types";
import { SnapRpcMethodRequest } from "@keystonehq/aptosnap-types";
// import { InjectedExtension } from "@polkadot/extension-inject/types";
import { enableAptosSnap } from "@keystonehq/aptosnap-adapter";
import { MetamaskAptosSnap } from "@keystonehq/aptosnap-adapter/build/snap";

declare global {
  interface Window {
    ethereum: {
      isMetaMask: boolean;
      isUnlocked: Promise<boolean>;
      on: (eventName: unknown, callback: unknown) => unknown;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      request: <T>(request: SnapRpcMethodRequest | { method: string; params?: any[] | undefined }) => Promise<T>;
    };
  }
}

export function hasMetaMask(): boolean {
  if (!window.ethereum) {
    return false;
  }
  return window.ethereum.isMetaMask;
}

export const defaultSnapId = 'local:http://localhost:8081';

let isSnapInstalled: boolean = false;

export interface SnapInitializationResponse {
  isSnapInstalled: boolean;
  snap?: MetamaskAptosSnap;
}

export async function initiateAptosSnap(): Promise<SnapInitializationResponse> {
  const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;
  try {
    console.log("installing snap");

    const metamaskAptosSnap = await enableAptosSnap({ network: "devnet" }, snapId, { version: "latest" });
    isSnapInstalled = true;
    console.log("Snap installed!!");
    return { isSnapInstalled, snap: metamaskAptosSnap };
  } catch (e) {
    console.log(e);
    isSnapInstalled = false;
    return {isSnapInstalled};
  }
}




// export async function initiateAptosSnap(): Promise<SnapInitializationResponse> {
//   const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId;
//   try {
//     console.log('Attempting to connect to snap...');
//     const metamaskAptosSnap = await enableAptosSnap({ networkName: "devnet" }, snapId, { version: "latest" });
//     isSnapInstalled = true;
//     console.log('Snap installed!');
//     return { isSnapInstalled, snap: metamaskAptosSnap };
//   } catch (e) {
//     isSnapInstalled = false;
//     console.error(e);
//     return { isSnapInstalled };
//   }
// }
