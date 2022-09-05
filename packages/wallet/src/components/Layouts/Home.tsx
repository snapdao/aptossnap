import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export const Home: FC<Props> = ({ children }) => {
  return (
    <div>
      123
      {children}
    </div>
  );
};
