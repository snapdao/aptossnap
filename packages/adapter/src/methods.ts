import {
  MetamaskAptosRpcRequest,
  SnapConfig
} from '@keystonehq/aptossnap-types'
import { BCS, HexString } from 'aptos'
import { MetamaskAptosSnap } from './snap'

async function sendSnapMethod<T> (
  request: MetamaskAptosRpcRequest,
  snapId: string
): Promise<T> {
  return await window.ethereum.request({
    method: snapId,
    params: [request]
  })
}

export async function getAccount (
  this: MetamaskAptosSnap,
  accountIndex: number
): Promise<PublicAccount> {
  return await sendSnapMethod(
    { method: 'aptos_getAccount', params: { accountIndex } },
    this.snapId
  )
}

export async function setConfiguration (
  this: MetamaskAptosSnap,
  config: SnapConfig
): Promise<void> {
  await sendSnapMethod(
    { method: 'aptos_configure', params: { configuration: config } },
    this.snapId
  )
}

export async function getBalance (this: MetamaskAptosSnap): Promise<string> {
  return await sendSnapMethod({ method: 'aptos_getBalance' }, this.snapId)
}

export async function signTransaction (this: MetamaskAptosSnap, from: HexString, to: HexString, amount: number | BigInt, extraArgs?: {
  coinType?: string
  maxGasAmount?: BCS.Uint64
  gasUnitPrice?: BCS.Uint64
  expireTimestamp?: BCS.Uint64
}): Promise<string> {
  return await sendSnapMethod({
    method: 'aptos_signTransaction',
    params: {
      from,
      to,
      amount,
      extraArgs
    }
  }, this.snapId)
}

export async function submitTransaction (this: MetamaskAptosSnap, bcsTxn: Uint8Array): Promise<string> {
  return await sendSnapMethod({ method: 'aptos_submitTransaction', params: { bcsTxn } }, this.snapId)
}

// export async function configure(
//   this: MetamaskAptosSnap,
//   configuration: SnapConfig
// ): Promise<void> {
//   return await sendSnapMethod(
//     { method: "aptos_configure", params: { configuration: configuration } },
//     this.snapId
//   );
// }
