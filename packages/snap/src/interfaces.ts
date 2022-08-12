import {
  MessageStatus,
  MetamaskAptosRpcRequest,
  SnapConfig,
} from "@keystonehq/aptosnap-types";
import { defaultConfiguration } from "./configuration/predefined";

export type FMethodCallback = (
  originString: string,
  requestObject: MetamaskAptosRpcRequest
) => Promise<unknown>;

export type MetamaskState = {
  filecoin: {
    config: SnapConfig;
    messages: MessageStatus[];
  };
};

export const EmptyMetamaskState: () => MetamaskState = () => ({
  filecoin: { config: defaultConfiguration, messages: [] },
});
