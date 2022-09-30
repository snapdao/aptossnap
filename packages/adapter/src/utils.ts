import { AptosNetwork } from './types'

export function hasMetaMask (): boolean {
  if (!window.ethereum) {
    return false
  }
  return window.ethereum.isMetaMask
}

export type GetSnapsResponse = {
  [k: string]: {
    permissionName?: string;
    id?: string;
    version?: string;
    initialPermissions?: { [k: string]: unknown };
  };
};
async function getWalletSnaps (): Promise<GetSnapsResponse> {
  return await window.ethereum.request({
    method: 'wallet_getSnaps'
  })
}

export async function isMetamaskSnapsSupported (): Promise<boolean> {
  try {
    await getWalletSnaps()
    return true
  } catch (e) {
    return false
  }
}

export async function isSnapInstalled (
  snapOrigin: string,
  version?: string
): Promise<boolean> {
  console.log(await getWalletSnaps())
  try {
    return !!Object.values(await getWalletSnaps()).find(
      (permission) =>
        permission.id === snapOrigin &&
        (!version || permission.version === version)
    )
  } catch (e) {
    console.log('Failed to obtain installed snaps', e)
    return false
  }
}

export function getConfigurationByNetwork (network: AptosNetwork) {
  return {
    mainnet: {
      rpc: {
        node: 'https://fullnode.devnet.aptoslabs.com',
        faucet: 'https://faucet.devnet.aptoslabs.com/'
      }
    },
    devnet: {
      rpc: {
        node: 'https://fullnode.devnet.aptoslabs.com',
        faucet: 'https://faucet.devnet.aptoslabs.com/'
      }
    },
    testnet: {
      rpc: {
        node: 'https://fullnode.testnet.aptoslabs.com',
        faucet: 'https://faucet.testnet.aptoslabs.com/'
      }
    }
  }[network]
}
