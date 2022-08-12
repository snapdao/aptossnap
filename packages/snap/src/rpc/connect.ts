import { SnapProvider } from "@metamask/snap-types";
import { AptosAccount } from "aptos";
import Web3 from "../web3";

export async function connect(wallet: SnapProvider): Promise<AptosAccount> {
  const web3 = new Web3();
  const account: AptosAccount = await web3.connect(wallet);
  console.log("getAccount", account.address().hex());
  return account;
}
