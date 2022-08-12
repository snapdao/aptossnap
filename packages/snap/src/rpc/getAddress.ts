import { AptosAccount } from "aptos";
import { AptosNetwork, Wallet } from "../interfaces";
import { getPrivKey } from "../aptos/account";

export async function getAddress(
  wallet: Wallet,
  network: AptosNetwork
): Promise<string> {
  const privateKey = await getPrivKey(wallet, network);
  const account = new AptosAccount(privateKey);
  return account.address().hex();
}
