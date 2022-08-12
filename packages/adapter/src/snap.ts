import { AptosSnapApi } from "@keystonehq/aptosnap-types";
import { configure, connect } from "./methods";

export class MetamaskAptosSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getAptosSnapApi = async (): Promise<AptosSnapApi> => {
    return {
      configure: configure.bind(this),
      connect: connect.bind(this),
    };
  };
}
