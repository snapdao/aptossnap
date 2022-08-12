import { SnapConfig } from "@keystonehq/aptosnap-types";

declare module "@chainsafe/metamask-polkadot-adapter" {

  export function injectMetamaskPolkadotSnapProvider(network: "westend" | "kusama",
    config?: SnapConfig,
    pluginOrigin?: string): void;
}
