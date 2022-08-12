import { Box, Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { useCallback, useContext, useEffect, Fragment } from "react";
import Alert from "@material-ui/lab/Alert";
import { MetamaskActions, MetaMaskContext } from "../../context/metamask";
import { initiateAptosSnap } from "../../services/metamask";

export const MetaMaskConnector = () => {

  const [state, dispatch] = useContext(MetaMaskContext);

  useEffect(() => {
    (async () => {
      const isConnected = sessionStorage.getItem('metamask-snap');
      if (isConnected) {
        const installResult = await initiateAptosSnap();
        if (installResult.isSnapInstalled) {
          dispatch({
            type: MetamaskActions.SET_INSTALLED_STATUS,
            payload: {isInstalled: true, snap: installResult.snap}
          });
        }
      }
    })();
  } , [dispatch]);

  const installSnap = useCallback(async () => {
    const installResult = await initiateAptosSnap();
    if (!installResult.isSnapInstalled) {
      // eslint-disable-next-line max-len
      dispatch({ payload: { isInstalled: false, message: "Please accept snap installation prompt" }, type: MetamaskActions.SET_INSTALLED_STATUS });
    } else {
      // eslint-disable-next-line max-len
      dispatch({ payload: { isInstalled: true, snap: installResult.snap }, type: MetamaskActions.SET_INSTALLED_STATUS });
    }
  }, [dispatch]);

  const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch({ payload: false, type: MetamaskActions.SET_INSTALLED_STATUS });
  };

  const shouldDisplaySnackbar = (): boolean => {
    if (!state.aptosSnap.isInstalled && state.aptosSnap.message) return true;
    else return false;
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        open={shouldDisplaySnackbar()}
        autoHideDuration={6000}
        onClose={handleClose}
        message={state.aptosSnap.message}
        action={
          <React.Fragment>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      />
      {state.hasMetaMask &&
        <Fragment>
          <Alert severity="warning">Ensure that MetaMask is installed!</Alert>
          <Box mt={"1rem"} />
        </Fragment>
      }
      <Button
        disabled={!state.hasMetaMask}
        onClick={installSnap}
        variant="contained"
        size={"large"}
        color="primary"
      >
        Connect to MetaMask
      </Button>
    </div>
  );

};
