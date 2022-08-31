import { SnapConfig } from '@keystonehq/aptossnap-types'
import { Wallet } from '../interfaces'

export async function configure (
  wallet: Wallet,
  configuration: SnapConfig
): Promise<SnapConfig> {
  await wallet.request({
    method: 'snap_manageState',
    params: ['update', configuration]
  })
  return configuration
}
