import { Link } from "react-router-dom";
import { UserAvatar } from "../../ui/components";
import { IProject } from "../../../models/data";

export const ProjectCard: React.FC<IProject> = (props: IProject) => {
  return (
    <div className="bg-light-100 dark:bg-dark-300 p-3 rounded-md shadow-lg">
      <div className="flex flex-col gap-2 mb-4 px-2">
        <h2 className="text-2xl font-semibold text-dark-300 dark:text-light-100">
          {props.title}
        </h2>
        <h4 className="text text-dark-300 dark:text-light-100">
          {props.description}
        </h4>
      </div>
      <div className="flex flex-col sm:flex-row gap-4 justify-between sm:px-7">
        <div className="flex flex-col gap-1">
          <h6 className="text-sm text-dark-300 dark:text-light-100 mb-1 ">
            Creador del proyecto:
          </h6>
          <div className="flex gap-1 items-center w-full">
            <UserAvatar size="small" username={props.creator.username} />
            <div className="flex flex-col text-sm  text-dark-300 dark:text-light-100">
              <span className="w-fit">{props.creator.username}</span>
              <span>{props.creator.email}</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex flex-col gap-1">
            <h6 className="text-sm text-dark-300 dark:text-light-100">
              Colaboradores del proyecto:
            </h6>
            <div className="flex flex-wrap gap-1 w-max">
              {!props.collaborators.filter(
                (collaborator) => collaborator.role !== "admin"
              ).length && (
                <span className="text-sm text-gray-300">
                  Sin colaboradores por el momento
                </span>
              )}
              {props.collaborators
                .filter((collaborator) => collaborator.role !== "admin")
                .map((collaborator, index) => {
                  return (
                    index <= 2 && (
                      <div
                        key={collaborator._id}
                        className="cursor-pointer"
                        title={`${collaborator.user.username} - ${collaborator.user.email}`}
                      >
                        <UserAvatar
                          size="small"
                          username={collaborator.user.username}
                        />
                      </div>
                    )
                  );
                })}
              {props.collaborators.filter(
                (collaborator) => collaborator.role !== "admin"
              ).length > 3 && (
                <div
                  className={`flex items-center justify-center bg-light-400 rounded-full w-8 h-8 text-xl`}
                >
                  <span
                    className={`uppercase text-light-100 leading-[0rem] text-lg`}
                  >
                    {`+${
                      props.collaborators.filter(
                        (collaborator) => collaborator.role !== "admin"
                      ).length - 3
                    }`}
                  </span>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-1">
            <h6 className="text-sm text-dark-300 dark:text-light-100">
              Usuarios invitados:
            </h6>
            <div className="flex flex-wrap gap-1">
              {!props.invitations.length && (
                <span className="text-sm text-gray-300">
                  Sin usuarios invitados por el momento
                </span>
              )}
              {props.invitations.map((invitation, index) => {
                return (
                  index <= 2 && (
                    <div
                      key={invitation._id}
                      className="cursor-pointer"
                      title={`${invitation.username} - ${invitation.email}`}
                    >
                      <UserAvatar size="small" username={invitation.username} />
                    </div>
                  )
                );
              })}
              {props.invitations.length > 3 && (
                <div
                  className={`flex items-center justify-center bg-light-400 rounded-full w-8 h-8 text-xl`}
                >
                  <span
                    className={`uppercase text-light-100 leading-[0rem] text-lg`}
                  >
                    {`+${props.invitations.length - 3}`}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 flex flex-col gap-1 sm:px-7">
        <h6 className="text-sm text-dark-300 dark:text-light-100 mb-1">
          Tareas del proyecto:
        </h6>
        <div className="flex flex-col sm:flex-row text-sm gap-1">
          <span className="bg-yellow-50 p-1 rounded-md text-dark-300 w-fit">
            Por hacer:{" "}
            {props.tasks.filter((task) => task.status === "to do").length}
          </span>
          <span className="bg-blue-50 p-1 rounded-md text-dark-300 w-fit">
            En progreso:{" "}
            {props.tasks.filter((task) => task.status === "in progress").length}
          </span>
          <span className="bg-green-50 p-1 rounded-md text-dark-300 w-fit">
            Completadas:{" "}
            {props.tasks.filter((task) => task.status === "done").length}
          </span>
        </div>
      </div>
      <div className="p-2 flex justify-end mt-4">
        <Link
          to={`/projects/${props._id}/info`}
          className="px-6 py-1 text-light-100 text-center font-semibold rounded-md bg-primary-50 w-full sm:w-fit hover:bg-primary-100"
        >
          {" "}
          Ver Proyecto
        </Link>
      </div>
    </div>
  );
};
