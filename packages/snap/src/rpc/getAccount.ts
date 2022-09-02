import { AptosAccount } from 'aptos'
import { Wallet } from '../interfaces'
import { getBIP44AddressKeyDeriver, JsonBIP44CoinTypeNode } from '@metamask/key-tree'

export async function getPrivKey (
  wallet: Wallet
): Promise<Buffer> {
  const bip44Node = (await wallet.request({
    method: 'snap_getBip44Entropy_637',
    params: []
  })) as JsonBIP44CoinTypeNode

  const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node)
  const extendedPrivateKey = await addressKeyDeriver(Number(0))
  return extendedPrivateKey.privateKeyBuffer.slice(0, 32)
}

export async function getAccount (
  wallet: Wallet
): Promise<AptosAccount> {
  const privateKey = await getPrivKey(wallet)
  return new AptosAccount(privateKey)
}
