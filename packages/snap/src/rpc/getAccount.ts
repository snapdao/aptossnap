import { AptosAccount } from 'aptos'
import { Wallet } from '../interfaces'
import { JsonSLIP10Node } from '@metamask/key-tree'

type GetBip32EntropyParameters = {
  path: ['m', ...(`${number}` | `${number}'`)[]];
  curve: 'secp256k1' | 'ed25519';
};

export async function getPrivKey (
  wallet: Wallet
): Promise<Buffer> {
  const params: GetBip32EntropyParameters = {
    path: ['m', "44'", "637'", "0'", "0'", "0'"],
    curve: 'ed25519'
  }
  const node = (await wallet.request({
    method: 'snap_getBip32Entropy',
    params
  })) as JsonSLIP10Node
  return Buffer.from(node.privateKey, 'hex')
}

export async function getAccount (
  wallet: Wallet
): Promise<AptosAccount> {
  const privateKey = await getPrivKey(wallet)
  return new AptosAccount(privateKey)
}
