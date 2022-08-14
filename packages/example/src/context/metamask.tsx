import { hasMetaMask } from "../services/metamask";
import React, { createContext, Dispatch, PropsWithChildren, Reducer, useReducer } from "react";
import { MetamaskAptosSnap } from "@keystonehq/aptossnap-adapter/build/snap";

interface IaptosSnap {
  isInstalled: boolean
  message: string;
  snap?: MetamaskAptosSnap;
}

export interface MetamaskState {
  aptosSnap: IaptosSnap,
  hasMetaMask: boolean,
}

const initialState: MetamaskState = {
  hasMetaMask: hasMetaMask(),
  aptosSnap: {
    isInstalled: false,
    message: ""
  }
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type MetamaskDispatch = { type: MetamaskActions, payload: any };
// eslint-disable-next-line @typescript-eslint/no-empty-function
export const MetaMaskContext = createContext<[MetamaskState, Dispatch<MetamaskDispatch>]>([initialState, () => { }]);

export enum MetamaskActions {
  SET_INSTALLED_STATUS
}

const reducer: Reducer<MetamaskState, MetamaskDispatch> = (state, action) => {
  switch (action.type) {
    case MetamaskActions.SET_INSTALLED_STATUS: {
      return {
        ...state,
        aptosSnap: action.payload
      };
    }
    default: {
      return state;
    }
  }

};


export const MetaMaskContextProvider = (props: PropsWithChildren<Record<string, unknown>>) => {

  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MetaMaskContext.Provider value={[state, dispatch]}>
      {props.children}
    </MetaMaskContext.Provider>
  );
};
