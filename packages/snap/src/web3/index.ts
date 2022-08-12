import { AptosAccount } from "aptos";
import {
  getBIP44AddressKeyDeriver,
  JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import { SnapProvider } from "@metamask/snap-types";

export interface AccountMetaData {
  derivationPath: string;
  address: string;
  publicKey?: string;
}

export const MAX_ACCOUNTS = 5;
export const COIN_TYPE = 637;

export default class Web3 {
  // faucetClient: FaucetClient;
  //
  // aptosClient: AptosClient;
  //
  // tokenClient: TokenClient;

  // constructor(node_url, faucet_url) {
  //     this.faucetClient = new FaucetClient(node_url, faucet_url);
  //     this.aptosClient = new AptosClient(node_url);
  //     this.tokenClient = new TokenClient(this.aptosClient);
  // }
  constructor() {}

  async connect(wallet: SnapProvider): Promise<AptosAccount> {
    const bip44Node = (await wallet.request({
      method: `snap_getBip44Entropy_${COIN_TYPE}`,
      params: [],
    })) as JsonBIP44CoinTypeNode;
    const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node);
    const extendedPrivateKey = await addressKeyDeriver(Number(0));
    const privateKey = extendedPrivateKey.privateKeyBuffer.slice(0, 32);
    console.log("-----Web3---connect-------", privateKey);
    return new AptosAccount(privateKey);
  }
}
