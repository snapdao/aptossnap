import { AptosAccount } from 'aptos'
import { Wallet } from '../interfaces'
import { PublicAccount } from '@keystonehq/aptossnap-types'
import {JsonSLIP10Node} from "@metamask/key-tree";

type GetBip32EntropyParameters = {
  path: ['m', ...(`${number}` | `${number}'`)[]];
  curve: 'secp256k1' | 'ed25519';
};

export async function getPrivKey (
  wallet: Wallet,
  accountIndex: number
): Promise<Buffer> {
  const params: GetBip32EntropyParameters = {
    path: ['m', "44'", "637'", `${accountIndex}'`, "0'", "0'"],
    curve: 'ed25519'
  }
  const node = (await wallet.request({
    method: 'snap_getBip32Entropy',
    params
  })) as JsonSLIP10Node
  return Buffer.from(node.privateKey, 'hex')
}

export async function getAccount (
  wallet: Wallet,
  accountIndex: number
): Promise<PublicAccount> {
  const privateKey = await getPrivKey(wallet, accountIndex)
  const account = new AptosAccount(privateKey)
  return {
    address: account.address().hex(),
    publicKey: account.signingKey.publicKey.toString()
  }
}
