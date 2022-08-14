import { SnapConfig } from "@keystonehq/aptossnap-types";

declare module "@chainsafe/metamask-polkadot-adapter" {

  export function injectMetamaskPolkadotSnapProvider(network: "westend" | "kusama",
    config?: SnapConfig,
    pluginOrigin?: string): void;
}
