import { FC } from "react";
import { Button } from "semantic-ui-react";

interface Props {}

export const DashBoard: FC<Props> = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <Button>GetAccount</Button>
    </>
  );
};
