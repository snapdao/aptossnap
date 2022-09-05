import { FC, useContext, useEffect, useState } from "react";
import { MetamaskSnapApi } from "@keystonehq/aptossnap-adapter/build/types";
import { MetaMaskConnector } from "./MetaMaskConnector";
import { MetaMaskContext } from "~/context/metamask";

interface Props {}

export const DashBoard: FC<Props> = () => {
  const [state] = useContext(MetaMaskContext);

  const [api, setApi] = useState<MetamaskSnapApi | null>(null);

  useEffect(() => {
    (async () => {
      if (state.aptosSnap.isInstalled && state.aptosSnap.snap) {
        const aptosApi = await state.aptosSnap.snap.getMetamaskSnapApi();
        setApi(aptosApi);
        console.log("%c 🍷 aptosApi", "color:#42b983", aptosApi);

        console.log(api);
      }
    })();
  }, [state.aptosSnap.isInstalled, state.aptosSnap.snap]);

  return (
    <>
      <h1>Dashboard</h1>
      {!state.aptosSnap.isInstalled ? <MetaMaskConnector /> : <>Installed</>}
    </>
  );
};
