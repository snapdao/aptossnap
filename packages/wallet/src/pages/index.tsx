import { Card } from "semantic-ui-react";
import { DashBoard } from "~/components/Dashboard";

export function Index(): JSX.Element {
  return (
    <>
      <Card className="text-lg">IndexPage</Card>
      <DashBoard />
    </>
  );
}
