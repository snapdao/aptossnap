import React, {useCallback, useContext, useEffect, useState} from "react";
import {
    Box, Card, CardContent, CardHeader,
    Container, Grid, Hidden, InputLabel, MenuItem, Select, Typography,
} from '@material-ui/core/';
import {MetaMaskConnector} from "../MetaMaskConnector/MetaMaskConnector";
import {MetaMaskContext} from "../../context/metamask";
import {Account} from "../../components/Account/Account";
import {AptosSnapApi} from "@keystonehq/aptosnap-types";
import Footer from "../../Footer";

export const Dashboard = () => {

    const [state] = useContext(MetaMaskContext);
    const [balance, setBalance] = useState("");
    const [address, setAddress] = useState("");
    const [authenticationKey, setAuthenticationKey] = useState("");
    const [networks, setNetworks] =  useState<"mainnet"|"devnet">("devnet")

    const [network, setNetwork] = useState<"mainnet" | "devnet" >("devnet");

    const [api, setApi] = useState<AptosSnapApi|null>(null);

    const handleNetworkChange = async (event: React.ChangeEvent<{value: any}>) => {
        const selectedNetwork = event.target.value as "mainnet" | "devnet";
        if (selectedNetwork === network) return;
        if (api) {
            try {
                await api.configure({network: selectedNetwork});
                setNetworks(selectedNetwork)
                setNetwork(selectedNetwork);
            } catch(e) {
                console.error("Unable to change network", e)
            }
        }
    };

    useEffect(() => {
        (async () => {
            if (state.aptosSnap.isInstalled && state.aptosSnap.snap) {
                const aptosApi = await state.aptosSnap.snap.getAptosSnapApi();
                console.log("aptosApi", aptosApi);
                setApi(aptosApi);
            }
        })();
    }, [state.aptosSnap.isInstalled, state.aptosSnap.snap]);

    useEffect(() => {
        (async () => {
            if (api) {
                const account = await api.connect();
                setAddress(account.address().hex());
                setAuthenticationKey(account.authKey().toString());
                // setBalance(await api.getBalance());
            }
        })();
    }, [api, network]);

    // useEffect( () => {
    //     // periodically check balance
    //     const interval = setInterval(async () => {
    //         if (api) {
    //             const newBalance = await api.getBalance();
    //             if (newBalance !== balance) {
    //                 setBalanceChange(true);
    //                 setBalance(newBalance);
    //             } else {
    //                 setBalanceChange(false)
    //             }
    //         }
    //     }, 30000); // every 30 seconds ~ 1 epoch
    //     return () => clearInterval(interval);
    // }, [api, balance, setBalance, setBalanceChange]);

    return (
        <Container maxWidth="lg">
            <Grid direction="column" alignItems="center" justifyContent="center" container spacing={3}>
                <Box m="2rem" style={{textAlign: "center"}}>
                    <Typography variant="h2">
                        Aptos demo
                    </Typography>
                </Box>
                <Hidden xsUp={state.aptosSnap.isInstalled}>
                    <MetaMaskConnector/>
                    <Footer/>
                </Hidden>
                <Hidden xsUp={!state.aptosSnap.isInstalled}>
                    <Box m="1rem" alignSelf="baseline">
                        <InputLabel>Network</InputLabel>
                        <Select
                            onChange={handleNetworkChange}
                            value={networks}
                        >
                            <MenuItem value={"t"}>Devnet</MenuItem>
                            <MenuItem value={"f"}>Mainnet</MenuItem>
                        </Select>
                    </Box>
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12}>
                            <Account
                                address={address}
                                // balance={balance + " FIL"}
                                authenticationKey={authenticationKey}
                                api={api}
                                // balanceChange={balanceChange}
                            />
                        </Grid>
                    </Grid>
                </Hidden>
            </Grid>
        </Container>
    );
};