import { Outlet } from "react-router-dom";
import { IChildrenProps } from "../../../models/components";
import { Navbar } from "../components";

export const ProjectsLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="custom-container pt-24 pb-10">
        <Outlet />
      </div>
    </>
  );
};
