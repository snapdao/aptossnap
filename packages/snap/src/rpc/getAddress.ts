import { AptosAccount } from 'aptos'
import { Wallet } from '../interfaces'
import { getPrivKey } from '../aptos/account'

export async function getAddress (
  wallet: Wallet,
  accountIndex: number
): Promise<string> {
  const privateKey = await getPrivKey(wallet, accountIndex)
  const account = new AptosAccount(privateKey)
  return account.address().hex()
}
