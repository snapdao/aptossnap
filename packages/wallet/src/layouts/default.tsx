import { FC, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div>Default Layout</div>
      {children}
    </>
  );
};
