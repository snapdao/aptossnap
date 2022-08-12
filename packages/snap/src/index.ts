import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getAddress } from "./rpc/getAddress";
import { EmptyMetamaskState, MetamaskState, Wallet } from "./interfaces";
import { configure } from "./rpc/configure";

declare let wallet: Wallet;

// eslint-disable-next-line
export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
  // const state = await wallet.request({
  //   method: "snap_manageState",
  //   params: ["get"],
  // });
  //
  // if (!state) {
  //   // initialize state if empty and set default config
  //   await wallet.request({
  //     method: "snap_manageState",
  //     params: ["update", EmptyMetamaskState()],
  //   });
  // }
  console.log("request", request.method, request);
  switch (request.method) {
    case "aptos_configure": {
      const state = (await wallet.request({
        method: "snap_manageState",
        params: ["get"],
      })) as MetamaskState;
      // const isInitialConfiguration = state.aptos.config === null;
      // reset api and remove asset only if already configured
      // if (!isInitialConfiguration) {
      //   resetApi();
      // }
      // set new configuration
      return await configure(wallet, "devnet",{});
    }
    case "aptos_getAddress":
      console.log('-------aptos_getAddress- is requested--------');
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      return await getAddress(wallet, "devnet");
    default:
      throw new Error("Method not found.");
  }
};
