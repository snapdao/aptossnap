import { FC } from "react";
import { RouteObject } from "react-router-dom";
import * as layouts from "~/layouts";

const APP_NAME = "ReactRouterLayout";

export interface RouteObjectExt<T> extends RouteObject {
  // TODO: generate enum file impl type complement
  layout?: T;
  _layoutSeted?: boolean;
}

export function setLayouts<T>(routes: RouteObjectExt<T>[]): void {
  const DefaultLayout = importLayout("DefaultLayout");

  if (!DefaultLayout) {
    throw new Error(`[${APP_NAME}]: DefaultLayout not found`);
  }

  routes.forEach((route) => {
    if (route._layoutSeted) return;
    if (!route.layout) {
      route.element = <DefaultLayout>{route.element}</DefaultLayout>;
    } else {
      const Layout = importLayout(route.layout);

      if (Layout) {
        route.element = <Layout>{route.element}</Layout>;
      }
    }
    route._layoutSeted = true;
  });
}

function importLayout<T>(name: T): FC<any> | undefined {
  const layout = Object.entries(layouts as { [s: string]: unknown }).find(
    ([k]) => k === (name as unknown as string) + ""
  );

  if (!layout) {
    console.error(`[${APP_NAME}] layout not found:`, name);
  }

  return layout?.[1] as FC<any>;
}
