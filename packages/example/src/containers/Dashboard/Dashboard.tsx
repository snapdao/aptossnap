import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { Account } from "../../components/Account/Account";
import { MetaMaskConnector } from "../MetaMaskConnector/MetaMaskConnector";
import { MetaMaskContext } from "../../context/metamask";
import { MetamaskSnapApi } from "@keystonehq/aptossnap-adapter/build/types";

export const Dashboard = () => {
  const [state] = useContext(MetaMaskContext);

  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [network, setNetwork] = useState<"mainnet" | "devnet">("devnet");

  const [api, setApi] = useState<MetamaskSnapApi | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleNetworkChange = async (event: React.ChangeEvent<{ value: any }>) => {
    const networkName = event.target.value as "devnet" | "mainnet";
    if (networkName === network) return;
    if (!api) return;
    await api.setConfiguration({ network: networkName });
    setNetwork(networkName);
  };

  useEffect(() => {
    (async () => {
      if (state.aptosSnap.isInstalled && state.aptosSnap.snap) {
        const aptosApi = await state.aptosSnap.snap.getMetamaskSnapApi();
        setApi(aptosApi);
      }
    })();
  }, [state.aptosSnap.isInstalled, state.aptosSnap.snap]);

  useEffect(() => {
    (async () => {
      if (api) {
        setAddress(await api.getAddress(0));
        const balance = await api.getBalance()
        console.log('balance', balance)
        setBalance(balance)
      }
    })();
  }, [api, network]);

  async function getBalance() {
    const balance = await (api as any).getBalance()
    console.log(balance, new Date())
    setBalance(balance);
  }

  async function signTransaction () {
    console.log(await api?.signTransaction(address as any, '0x4e77895d0265257cfa482104d337c58257674ff6f012ba04760c9cec99149a1f' as any, 10))
  }

  return (
    <Container maxWidth="lg">
      <Grid direction="column" alignItems="center" justifyContent="center" container spacing={3}>
        <Typography variant="h2">
          Aptos snap demo
        </Typography>
        {
          !state.aptosSnap.isInstalled && <MetaMaskConnector />
        }
        {
          state.aptosSnap.isInstalled && <>
              <InputLabel>Network</InputLabel>
              <Select
                  defaultValue={"devnet"}
                  onChange={handleNetworkChange}
              >
                <MenuItem value={"devnet"}>Devnet</MenuItem>
                <MenuItem value={"mainnet"}>Mainnet</MenuItem>
              </Select>
              <Grid container spacing={3} alignItems={"stretch"}>
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12}>
                <span onClick={signTransaction}>signTransaction</span>
                <Account network={network} address={address} balance={balance} publicKey={publicKey} />
              </Grid>
            </Grid>
            </Grid>
          </>
        }
      </Grid>
    </Container>
  );
};
