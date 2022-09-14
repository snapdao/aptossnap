import { FC, useCallback, useContext, useEffect } from "react";
import { Button, Header, Message, Portal, Segment } from "semantic-ui-react";
import { Tab, Tabs } from "snapkit";
import { MetamaskActions, MetaMaskContext } from "~/context/metamask";
import { initiateAptosSnap } from "~/plugins/metamask";

interface Props {}

export const MetaMaskConnector: FC<Props> = () => {
  const [state, dispatch] = useContext(MetaMaskContext);

  useEffect(() => {
    (async () => {
      const isConnected = sessionStorage.getItem("metamask-snap");
      console.log("%c 🍩 isConnected", "color:#2eafb0", isConnected);
      if (isConnected) {
        const installResult = await initiateAptosSnap();
        if (installResult.isSnapInstalled) {
          dispatch({
            type: MetamaskActions.SET_INSTALLED_STATUS,
            payload: { isInstalled: true, snap: installResult.snap },
          });
        }
      }
    })();
  }, [dispatch]);

  const installSnap = useCallback(async () => {
    const installResult = await initiateAptosSnap();
    if (!installResult.isSnapInstalled) {
      dispatch({
        payload: {
          isInstalled: false,
          message: "Please accept snap installation prompt",
        },
        type: MetamaskActions.SET_INSTALLED_STATUS,
      });
    } else {
      // eslint-disable-next-line max-len
      dispatch({
        payload: { isInstalled: true, snap: installResult.snap },
        type: MetamaskActions.SET_INSTALLED_STATUS,
      });
    }
  }, [dispatch]);

  const handleClose = (
    _event: React.SyntheticEvent | React.MouseEvent,
    reason?: string
  ): void => {
    if (reason === "clickaway") {
      return;
    }
    dispatch({ payload: false, type: MetamaskActions.SET_INSTALLED_STATUS });
  };

  const handleOpen = (ev: any, data: any): boolean => {
    console.log("%c 🍫 data", "color:#7f2b82", data);
    return Boolean(!state.aptosSnap.isInstalled && state.aptosSnap.message);
  };

  return (
    <div>
      <Portal
        closeOnTriggerClick
        openOnTriggerClick
        onOpen={handleOpen}
        onClose={() => handleClose}
        message={state.aptosSnap.message}
        trigger={<Button>Portal</Button>}
      >
        <Tabs >
          <Tab title="All"></Tab>
          <Tab title="A1"></Tab>
          <Tab title="B2"></Tab>
        </Tabs>
        <Segment
          style={{
            left: "40%",
            position: "fixed",
            top: "50%",
            zIndex: 1000,
          }}
        >
          <Header>aptosSnap msg</Header>
          <p>msg: {state.aptosSnap.message}</p>
        </Segment>
      </Portal>
      {state.hasMetaMask && (
        <>
          <Message>Ensure that MetaMask is installed!</Message>
        </>
      )}
      <Button
        disabled={!state.hasMetaMask}
        onClick={installSnap}
        variant="contained"
        size={"large"}
      >
        Connect to MetaMask
      </Button>
      {/* <Connect open={true} onClose={() => alert("asdf")} key={0}>
        <Connect.Install />
      </Connect> */}
    </div>
  );
};
