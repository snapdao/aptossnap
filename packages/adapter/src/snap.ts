import { MetamaskSnapApi } from "./types";
import { getAddress, getBalance, setConfiguration } from "./methods";

export class MetamaskAptosSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getMetamaskSnapApi = async (): Promise<MetamaskSnapApi> => {
    return {
      getAddress: getAddress.bind(this),
      setConfiguration: setConfiguration.bind(this),
      getBalance: getBalance.bind(this)
    };
  };
}
