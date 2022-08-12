import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import { AptosNetwork, Wallet } from "../interfaces";

const aptosNetwork = {
  mainnet: 637,
  devnet: 637,
};

export async function getPrivKey(
  wallet: Wallet,
  network: AptosNetwork
): Promise<Buffer> {
  const bip44Node = (await wallet.request({
    method: `snap_getBip44Entropy_${aptosNetwork[network]}`,
    params: [],
  })) as JsonBIP44CoinTypeNode;

  const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node);
  const extendedPrivateKey = await addressKeyDeriver(Number(0));
  return extendedPrivateKey.privateKeyBuffer.slice(0, 32);
}
