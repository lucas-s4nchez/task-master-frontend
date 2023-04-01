import { Menu } from "../components/Menu";
import { Navbar } from "../components/Navbar";
import { IChildrenProps } from "../interfaces";

export const AppLayout = ({ children }: IChildrenProps) => {
  return (
    <>
      <Navbar />
      <div className="custom-container pt-20">{children}</div>
    </>
  );
};
