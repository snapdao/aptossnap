import React from "react";
import {Box, Button, Card, CardContent, CardHeader, Divider, Grid, Typography} from '@material-ui/core/';
import {AptosSnapApi} from "@keystonehq/aptosnap-types";

export interface AccountProps {
    address: string,
    authenticationKey: string,
    // balance: string,
    // balanceChange: boolean,
    api: AptosSnapApi | null
}

export const Account = (props: AccountProps) => {

    return (
        <Card>
            <CardHeader title="Account details"/>
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6">ADDRESS:</Typography>
                        <Typography variant="subtitle2">{props.address}</Typography>
                        <Divider light/>
                        <Box m={"0.5rem"}/>
                        <Typography variant="h6">PUBLIC KEY:</Typography>
                        <Typography variant="subtitle2">{props.authenticationKey}</Typography>
                        <Divider light/>
                        <Box m={"0.5rem"}/>
                        {/*<Typography variant="h6">ACCOUNT BALANCE:</Typography>*/}
                        {/*{props.balanceChange*/}
                        {/*    ? <Typography variant="subtitle2" ><b>{props.balance}</b></Typography>*/}
                        {/*    : <Typography variant="subtitle2" >{props.balance}</Typography>*/}
                        {/*}*/}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};
