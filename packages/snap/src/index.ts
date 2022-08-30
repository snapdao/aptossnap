import { OnRpcRequestHandler } from "@metamask/snap-types";
import { getAddress } from "./rpc/getAddress";
import { Wallet } from "./interfaces";
import { configure } from "./rpc/configure";
import getBalance from "./rpc/getBalance";

declare let wallet: Wallet;

let address = ''

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
    case 'aptos_getBalance':
      return await getBalance(wallet, address)
    case "aptos_configure":
      // const state = (await wallet.request({
      //   method: "snap_manageState",
      //   params: ["get"],
      // })) as MetamaskState;
      // const isInitialConfiguration = state.aptos.config === null;
      // reset api and remove asset only if already configured
      // if (!isInitialConfiguration) {
      //   resetApi();
      // }
      // set new configuration
      return await configure(wallet, "devnet", {});
    case "aptos_getAddress":
      console.log("-------aptos_getAddress- is requested--------");
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      address = await getAddress(wallet, "devnet");
      return address
    default:
      throw new Error("Method not found.");
  }
};
