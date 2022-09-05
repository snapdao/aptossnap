import { FC, ReactNode } from "react";
import "./default.scss";

interface Props {
  children?: ReactNode;
}

export const DefaultLayout: FC<Props> = ({ children }) => {
  return (
    <>
      <div className="default-layout bg-n20">
        <div className="default-layout-container flex flex-col justify-center bg-n00">
          <div className="default-layout-container-body">{children}</div>
          <div className="default-layout-container-footer">
            <span className="default-layout-footer-copyright">
              Powered by MetaMask Snaps
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
