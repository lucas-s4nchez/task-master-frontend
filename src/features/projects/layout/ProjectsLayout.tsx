import { Navbar } from "../components";
import { IChildrenProps } from "../../../models/componentsProps";

export const ProjectsLayout: React.FC<IChildrenProps> = ({
  children,
}: IChildrenProps) => {
  return (
    <>
      <Navbar />
      <div className="custom-container pt-24 pb-10">{children}</div>
    </>
  );
};
