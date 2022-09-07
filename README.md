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

### How to run Aptos Snap on a wallet locally

```shell
yarn install && yarn demo
```

##

### Aptos Snap Integration

If you would like to integrate Aptos Snap into your dapp, you can make use of our npm. Refer to the following
document [here](https://github.com/KeystoneHQ/aptossnap/tree/master/packages/snap).

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
  you should build the metamask flask from source at this stage to play around.

```shell
git clone git@github.com:MetaMask/metamask-extension.git
cd metamask-extension
yarn
yarn build dist --build-type flask
```

## License

This project is dual-licensed under Apache 2.0 and MIT terms:

- [Apache License, Version 2.0](http://www.apache.org/licenses/LICENSE-2.0)
- [MIT license](http://opensource.org/licenses/MIT)


