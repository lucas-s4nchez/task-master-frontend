import { IChildrenProps } from "../../../models/components";
import { Navbar } from "../components";

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
