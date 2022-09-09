# Aptos adapter

Atops snap adapter is used to integrate Aptos Snap into your dapp.

## Installation

with `yarn`

```shell
yarn add @keystonehq/aptossnap-adapter
```

with `npm`

```shell
npm install @keystonehq/aptossnap-adapter
```

## Integration Example

```ts
import WalletAdapter from '@keystonehq/aptossnap-adapter';
//Enable `Aptos Snap` in your dapp
await walletAdapter.connect();
// Get an Aptos Public Account
const account = walletAdapter.publicAccount;
console.log(account.address); // 0xdc14ee7ed551b16e6f0d06da40767d9eb3f38d286d6842692993355385a2795d
console.log(account.publicKey); // 0xfa59a4f07139eaa8c8b6cf77a55d398d65792501d28edca9e9cdb997052b158f
// Sign Transaction
const transactionPayload = {
    arguments: [
        '0x1f410f23447ae2ad00e931b35c567783a5beb3b5d92c604f42f912416b7c3ccd',
        2,
    ],
    function: '0x1::coin::transfer',
    type: 'entry_function_payload',
    type_arguments: ['0x1::aptos_coin::AptosCoin'],
};
const txHash = await walletAdapter.signAndSubmitTransaction(
    transactionPayload,
);
console.log(txHash);
```
