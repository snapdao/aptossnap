# `Aptos Snap`

[![npm version](https://badge.fury.io/js/@keystonehq%2Faptossnap.svg)](https://badge.fury.io/js/@keystonehq%2Faptossnap)

Aptos Snap is the application allowing users to directly manage Aptos within the MetaMask interface. Since Snaps is
pre-release software, the alpha version of Aptos Snap is currently live on [Metamask Flask](https://metamask.io/flask/)
only, a canary distribution for developers that provides access to upcoming features.

*Note: MetaMask Flask is an experimental playground for developers and is not to be confused with the
normal [MetaMask wallet app](https://metamask.io/).

## MetaMask Snaps Introduction

Snaps is a system that allows developers to safely build and expand the capabilities of MetaMask. It is a program that
is run in an isolated environment with a limited set of capabilities, that can customize and modify MetaMask's wallet
experience for end users. For example, a snap can add new APIs to MetaMask thus adding support for different blockchains
or modify existing functionalities using internal APIs.

Additional information can be found [here](https://docs.metamask.io/guide/snaps.html).

### Usage

1. Enable `Aptos Snap` in your dapp

```ts
const result: boolean = await ethereum.request({
    method: 'wallet_enable',
    params: [
        {
            wallet_snap: {'npm:@keystonehq/aptossnap': {}},
        },
    ],
});
```

2. Get an Aptos Public Account

```ts
const result: string = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
        "npm:@keystonehq/aptossnap",
        {
            method: 'aptso_getAccount'
        },
    ],
});
```

3. Sign Transaction

```ts
const result: { txId: string, txHex: string } = await ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
        snapId,
        {
            method: 'aptos_signTransaction',
            params: {
                rawTransaction: bcsBytes // bcs serialized raw transaction bytes
            },
        },
    ],
})
```

### Building

Build the snap and test it locally with the following command:

```shell
yarn build
```

## Live Example

If you would like to integrate Aptos Snap into your dapp, you can use the following
codes [here](https://github.com/KeystoneHQ/aptossnap/tree/master/packages/demo).
