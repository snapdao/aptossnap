import { MetamaskAptosSnap } from "@keystonehq/aptossnap-adapter/src/snap";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  Reducer,
  useReducer,
} from "react";
import { hasMetaMask } from "~/plugins/metamask";

interface IaptosSnap {
  isInstalled: boolean;
  message: string;
  snap?: MetamaskAptosSnap;
}

export interface MetamaskState {
  hasMetaMask: boolean;
  aptosSnap: IaptosSnap;
}

const initialState: MetamaskState = {
  hasMetaMask: hasMetaMask(),
  aptosSnap: {
    isInstalled: false,
    message: "",
  },
};

export enum MetamaskActions {
  SET_INSTALLED_STATUS,
}

type MetamaskDispatch = { type: MetamaskActions; payload: any };
export const MetaMaskContext = createContext<
  [MetamaskState, Dispatch<MetamaskDispatch>]
>([initialState, () => {}]);

const reducer: Reducer<MetamaskState, MetamaskDispatch> = (state, action) => {
  switch (action.type) {
    case MetamaskActions.SET_INSTALLED_STATUS: {
      return {
        ...state,
        aptosSnap: action.payload,
      };
    }
    default: {
      return state;
    }
  }
};

export const MetaMaskContextProvider = (
  props: PropsWithChildren<Record<string, unknown>>
): JSX.Element => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MetaMaskContext.Provider value={[state, dispatch]}>
      {props.children}
    </MetaMaskContext.Provider>
  );
};
