import { AptosAccount } from 'aptos'
import { Wallet } from '../interfaces'
import { getPrivKey } from '../aptos/account'
import { PublicAccount } from '@keystonehq/aptossnap-types'
export async function getPubKey (
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
