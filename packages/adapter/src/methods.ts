import {MetamaskAptosRpcRequest} from "./types";

export async function sendSnapMethod<T> (
  request: MetamaskAptosRpcRequest,
  snapId: string
): Promise<T> {
  return await window.ethereum.request({
    method: snapId,
    params: [request]
  })
}

// export async function disconnect (
//   this: MetamaskAptosSnap
// ): Promise<void> {
//   return await sendSnapMethod(
//     { method: 'aptos_disconnect' },
//     this.snapId
//   )
// }
//
// export async function getAccount (
//   this: MetamaskAptosSnap
// ): Promise<PublicAccount> {
//   return await sendSnapMethod(
//     { method: 'aptos_getAccount' },
//     this.snapId
//   )
// }
//
// export async function configure (
//   this: MetamaskAptosSnap,
//   configuration: SnapConfig
// ): Promise<void> {
//   await sendSnapMethod(
//     { method: 'aptos_configure', params: { configuration } },
//     this.snapId
//   )
// }
//
// export async function getBalance (this: MetamaskAptosSnap): Promise<string> {
//   return await sendSnapMethod({ method: 'aptos_getBalance' }, this.snapId)
// }

// export async function signTransaction (this: MetamaskAptosSnap, transactionPayload: TransactionPayload): Promise<Uint8Array> {
//   return await sendSnapMethod({
//     method: 'aptos_signTransaction',
//     params: {
//       transactionPayload
//     }
//   }, this.snapId)
// }

// export async function submitTransaction (this: MetamaskAptosSnap, bcsTxn: Uint8Array): Promise<Uint8Array> {
//   return await sendSnapMethod({ method: 'aptos_submitTransaction', params: { bcsTxn } }, this.snapId)
// }
//
// export async function signAndSubmitTransaction (this: MetamaskAptosSnap, transactionPayload: TransactionPayload): Promise<HexEncodedBytes> {
//   return await sendSnapMethod({ method: 'aptos_signAndSubmitTransaction', params: { transactionPayload } }, this.snapId)
// }
