import { toast } from "react-hot-toast";
import { updateTaskStatus } from "../reducers/tasksReducer/taskSlice";

const verifyTaskStatusUpdate = (taskUpdateData) => {
  return (dispatch, getState) => {
    const { tasksList } = getState().tasks;

    const currentStatus = tasksList.find(
      (task) => task.id === taskUpdateData.taskId
    ).status;

    //preventing invalid action dispatch
    if (
      currentStatus === taskUpdateData.status ||
      taskUpdateData.status === "done" ||
      currentStatus === "todo"
    ) {
      dispatch(updateTaskStatus(taskUpdateData));
    } else {
      toast.error("This operation is not allowed", { id: "not-allowed" });
    }
  };
};

export default verifyTaskStatusUpdate;
