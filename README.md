# Aptos Snap

![](https://img.shields.io/badge/yarn=%3D3.2.3-orange.svg?style=flat-square)
![](https://img.shields.io/badge/Node.js-%3E%3D16.x-orange.svg?style=flat-square)
![Discord](https://img.shields.io/discord/818382715035975771?color=blue&label=Discord&logo=discor)

Metamask Snap to enable Metamask users interaction with Aptos.

Aptos Snap is the application allowing users to directly manage Aptos within the MetaMask interface. Since Snaps is
pre-release software, the alpha version of Aptos Snap is currently live on [Metamask Flask](https://metamask.io/flask/)
only, a canary distribution for developers that provides access to upcoming features.

*Note: MetaMask Flask is an experimental playground for developers and is not to be confused with the
normal [MetaMask wallet app](https://metamask.io/).

##

### MetaMask Snaps Introduction

Snaps is a system that allows developers to safely build and expand the capabilities of MetaMask. It is a program that
is run in an isolated environment with a limited set of capabilities, that can customize and modify MetaMask's wallet
experience for end users. For example, a snap can add new APIs to MetaMask thus adding support for different blockchains
or modify existing functionalities using internal APIs.

Additional information can be found [here](https://docs.metamask.io/guide/snaps.html).

##

### Packages Structure

```shell
packages
├── adapter # Aptos Snap adapter is used integrate Aptos Snap into your dapp.
├── demo # a simple demo to interact with aptos snap
└── snap # Aptos Snap is the Snap application which run in the MetaMask Flask.

```

### Integration Example

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

##

### How to start testing Aptos Snap (Alpha version)

1. Create a new browser profile or disable/uninstall any existing versions of Metamask
2. Download [MetaMask Flask](https://metamask.io/flask/)
3. Head over to the [Aptos Snap webpage](https://keystonehq.github.io/aptossnap/), create a test wallet, connect it to
   MetaMask Flask and approve the installation of the Aptos Snap app
4. Start experimenting

##

### Known issue

- Since Aptos currently using [slip-10](https://github.com/satoshilabs/slips/blob/master/slip-0010.md) for address
  generation, which has not been officially released in [Metamask Flask](https://metamask.io/flask/), so
  you should build the metamask flask from source at this stage to play around. Or you can download the build zip
  file [here](https://drive.google.com/file/d/1pobkTKT7kthzJ-7tSJp3BMmCfx0KjNeN/view?usp=sharing).

```shell
git clone git@github.com:MetaMask/metamask-extension.git
cd metamask-extension
yarn setup
yarn build dist --build-type flask
```

## License

This project is dual-licensed under Apache 2.0 and MIT terms:

- [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
- [MIT license](http://opensource.org/licenses/MIT)


