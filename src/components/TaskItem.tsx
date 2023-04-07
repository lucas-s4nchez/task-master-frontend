import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { RootState } from "../store/store";
import { onToggleTask } from "../store/ui/uiSlice";
import { useDispatch } from "react-redux";
import { Button, UserAvatar } from "../ui/components";
import { MdClose, MdDelete, MdEdit } from "react-icons/md";

const taskContainerVariant = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};
const taskItemVariant = {
  hidden: { scale: 0, opacity: 0 },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "tween",
    },
  },
};

export const TaskItem: React.FC = () => {
  const dispatch = useDispatch();
  const { activeTask } = useSelector((state) => (state as RootState).tasks);
  return (
    <>
      <motion.div
        className="fixed top-0 z-50 left-0 w-full h-full flex justify-center items-center bg-dark-400 bg-opacity-30 backdrop-blur-sm"
        onClick={() => dispatch(onToggleTask())}
        initial="hidden"
        animate="show"
        exit="hidden"
        variants={taskContainerVariant}
      >
        <motion.div
          className={`p-4 flex flex-col gap-2 rounded-md w-11/12 max-w-lg m-auto  ${
            activeTask?.status === "to do" && "bg-yellow-50"
          } ${activeTask?.status === "in progress" && "bg-blue-50"} ${
            activeTask?.status === "done" && "bg-green-50"
          }`}
          initial="hidden"
          animate="show"
          exit="hidden"
          variants={taskItemVariant}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <button
            className={`self-end p-1 rounded-full 
            hover:${activeTask?.status === "to do" && "bg-yellow-100"} 
            hover:${activeTask?.status === "in progress" && "bg-blue-100"} 
            hover:${activeTask?.status === "done" && "bg-green-100"}`}
            onClick={() => dispatch(onToggleTask())}
          >
            <MdClose />
          </button>
          <div>
            <h3 className="font-semibold">Título:</h3>
            <span>{activeTask?.title}</span>
          </div>
          <div>
            <h3 className="font-semibold">Descripción:</h3>
            <span>{activeTask?.description}</span>
          </div>
          <div>
            <h3 className="font-semibold">Autor:</h3>
            <div className="flex flex-wrap">
              <div className="text-sm flex gap-1 items-center">
                <UserAvatar
                  size="small"
                  username={activeTask?.author.username!}
                  bgColor="red"
                />
                <div className="flex flex-col">
                  <span>{activeTask?.author.username}</span>
                  <span>{activeTask?.author.email}</span>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h3 className="font-semibold">Tarea asignada a:</h3>
            <div className="flex gap-2 flex-wrap max-w-full mt-2">
              {activeTask?.assignedTo.map((user) => (
                <div key={user._id} className="text-sm flex gap-1 items-center">
                  <UserAvatar
                    size="small"
                    username={user.username}
                    bgColor="red"
                  />
                  <div className="flex flex-col">
                    <span>{user.username}</span>
                    <span>{user.email}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex justify-end gap-2 flex-wrap mt-4">
            <Button size="small" bgColor="red">
              <div className="flex gap-1 items-center justify-center ">
                editar <MdEdit className="text-sm" />
              </div>
            </Button>
            <Button size="small" bgColor="red">
              <div className="flex gap-1 items-center justify-center ">
                borrar <MdDelete className="text-sm" />
              </div>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </>
  );
};
