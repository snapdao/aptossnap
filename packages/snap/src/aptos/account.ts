import { JsonSLIP10Node } from '@metamask/key-tree'
import { Wallet } from '../interfaces'

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
