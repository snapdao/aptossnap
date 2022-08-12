import React, { useCallback, useContext, useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography
} from '@material-ui/core';
import { Transfer } from "../../components/Transfer/Transfer";
import { SignMessage } from "../../components/SignMessage/SignMessage";
import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
import { Account } from "../../components/Account/Account";
import { MetaMaskConnector } from "../MetaMaskConnector/MetaMaskConnector";
import { MetaMaskContext } from "../../context/metamask";
import { LatestBlock } from "../../components/LatestBlock/LatestBlock";
import { BlockInfo, Transaction } from "@keystonehq/aptosnap-types";
import { MetamaskSnapApi } from "@keystonehq/aptosnap-adapter/build/types";

export const Dashboard = () => {
  const [state] = useContext(MetaMaskContext);

  const [balance, setBalance] = useState("0");
  const [address, setAddress] = useState("");
  const [publicKey, setPublicKey] = useState("");
  const [latestBlock, setLatestBlock] = useState<BlockInfo>({ hash: "", number: "" });
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [network, setNetwork] = useState<"mainnet" | "devnet">("devnet");

  const [api, setApi] = useState<MetamaskSnapApi | null>(null);

  // const handleNewTransaction = useCallback(async () => {
  //   if (!api) return;
  //   setTransactions((await api.getAllTransactions()));
  // }, [setTransactions]);

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
        setAddress(await api.getAddress());
        // setPublicKey(await api.getPublicKey());
        // setBalance(await api.getBalance());
        // setLatestBlock(await api.getLatestBlock());
        // setTransactions((await api.getAllTransactions()));
      }
    })();
  }, [api, network]);

  // useEffect( () => {
  //   // periodically check balance
  //   const interval = setInterval(async () => {
  //     if (api) {
  //       const newBalance = await api.getBalance();
  //       setBalance(newBalance);
  //     }
  //   }, 30000); // every 30 seconds
  //   return () => clearInterval(interval);
  // }, [api, balance, setBalance]);

  return (
    <Container maxWidth="lg">
      <Grid direction="column" alignItems="center" justify="center" container spacing={3}>
        <Box m="2rem">
          <Typography variant="h2">
            Aptos snap demo
          </Typography>
        </Box>
        {
          !state.aptosSnap.isInstalled && <MetaMaskConnector />
        }
        {
          state.aptosSnap.isInstalled && <>
            <Box m="1rem" alignSelf="baseline">
              <InputLabel>Network</InputLabel>
              <Select
                defaultValue={"devnet"}
                onChange={handleNetworkChange}
              >
                <MenuItem value={"devnet"}>Devnet</MenuItem>
                <MenuItem value={"mainnet"}>Mainnet</MenuItem>
              </Select>
            </Box>
            <Grid container spacing={3} alignItems={"stretch"}>
            {/*  <Grid item xs={12}>*/}
            {/*    <LatestBlock block={latestBlock} />*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            {/*<Box m="1rem" />*/}
            <Grid container spacing={3} alignItems="stretch">
              <Grid item xs={12}>
                <Account network={network} address={address} balance={balance} publicKey={publicKey} />
              </Grid>
            </Grid>
            {/*<Box m="1rem" />*/}
            {/*<Grid container spacing={3} alignItems="stretch">*/}
            {/*  <Grid item md={6} xs={12}>*/}
            {/*    <Transfer network={network} onNewTransferCallback={handleNewTransaction} />*/}
            {/*  </Grid>*/}
            {/*  <Grid item md={6} xs={12}>*/}
            {/*    <SignMessage address={address} />*/}
            {/*  </Grid>*/}
            {/*</Grid>*/}
            {/*<Box m="1rem" />*/}
            {/*<Grid container spacing={3} alignItems={"stretch"}>*/}
            {/*  <Grid item xs={12}>*/}
            {/*    <Card>*/}
            {/*      <CardHeader title="Account transactions" />*/}
            {/*      <CardContent>*/}
            {/*        <TransactionTable txs={transactions} />*/}
            {/*      </CardContent>*/}
            {/*    </Card>*/}
            {/*  </Grid>*/}
            </Grid>
          </>
        }
      </Grid>
    </Container>
  );
};
