/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { createBrowserHistory } from "history";
import { useRoutes } from "react-router-dom";
import { JSXElementConstructor, ReactElement } from "react";
import { RouteObjectExt, setLayouts } from "~/plugins/reactRouterLayout";
import * as Layouts from "~/layouts";
import { Index } from "~/pages";
import { NFTIndex } from "~/pages/nft";
import { ActivityIndex } from "~/pages/activity";

const routes: RouteObjectExt<keyof typeof Layouts>[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "nft",
    element: <NFTIndex />,
  },
  {
    path: "activity",
    element: <ActivityIndex />,
  },
];

export const routerHistory = createBrowserHistory();

export function Routes(): ReactElement<
  any,
  string | JSXElementConstructor<any>
> | null {
  setLayouts(routes);

  return useRoutes(routes);
}
