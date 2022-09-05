import { DashBoard } from "~/components/Dashboard";
import { MetaMaskContextProvider } from "~/context/metamask";

export function Index(): JSX.Element {
  return (
    <>
      <MetaMaskContextProvider>
        <DashBoard />
      </MetaMaskContextProvider>
    </>
  );
}
