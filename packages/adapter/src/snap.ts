import { MetamaskSnapApi } from './types'
import { getAccount, getBalance, setConfiguration, signTransaction, submitTransaction } from './methods'

export class MetamaskAptosSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor (snapOrigin: string) {
    this.snapOrigin = snapOrigin
    this.snapId = `wallet_snap_${this.snapOrigin}`
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getMetamaskSnapApi = async (): Promise<MetamaskSnapApi> => {
    return {
      connect: getAccount.bind(this),
      account: getAccount.bind(this),
      setConfiguration: setConfiguration.bind(this),
      getBalance: getBalance.bind(this),
      signTransaction: signTransaction.bind(this),
      submitTransaction: submitTransaction.bind(this)
    }
  };
}
