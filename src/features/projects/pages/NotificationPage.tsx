import { Button, Loader, UserAvatar } from "../../ui/components";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useAuthStore } from "../../../hooks";
import {
  useAcceptInvitationMutation,
  useGetProjectsInvitationsQuery,
  useRejectInvitationMutation,
} from "../services/projectsApi";

export const NotificationPage: React.FC = () => {
  const { uid } = useAuthStore();
  const { data, isLoading } = useGetProjectsInvitationsQuery(uid ?? "", {
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
  });
  const [acceptInvitation, { isLoading: isLoadingAcceptInvitation }] =
    useAcceptInvitationMutation();
  const [rejectInvitation, { isLoading: isLoadingRejectInvitation }] =
    useRejectInvitationMutation();

  if (isLoading || isLoadingAcceptInvitation || isLoadingRejectInvitation) {
    return (
      <div className="w-screen h-screen flex justify-center items-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-md m-auto">
      {!data?.invitations.length && (
        <span className="text-dark-300 dark:text-light-100 flex justify-center text-lg">
          No tienes notificaciones
        </span>
      )}
      {data?.invitations.map((invitation) => (
        <div
          key={invitation._id}
          className="p-2 rounded-md flex flex-col gap-2 bg-light-100 dark:bg-dark-300 text-dark-300 dark:text-light-100"
        >
          <h2 className="text-xl font-semibold text-dark-300 dark:text-light-100">
            {invitation.title}
          </h2>
          <div>
            <h3 className="text-sm">Creado por:</h3>
            <div className="flex gap-2 flex-wrap max-w-full mt-2">
              <div className="text-sm flex gap-1 items-center">
                <UserAvatar
                  size="small"
                  username={invitation.creator.username}
                  bgColor="red"
                />
                <div className="flex flex-col">
                  <span>{invitation.creator.username}</span>
                  <span>{invitation.creator.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button
              bgColor="red"
              size="small"
              onClick={() => {
                rejectInvitation({ projectId: invitation._id, userId: uid });
              }}
            >
              <div className="flex gap-1 items-center">
                <AiOutlineCloseCircle className="text-xl" /> rechazar
              </div>
            </Button>
            <Button
              bgColor="green"
              size="small"
              onClick={() => {
                acceptInvitation({ projectId: invitation._id, userId: uid });
              }}
            >
              <div className="flex gap-1 items-center">
                <BsCheckCircle className="text-xl" /> aceptar
              </div>
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
