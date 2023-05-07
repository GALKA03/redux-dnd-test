import { createSlice } from "@reduxjs/toolkit";
import { getItemsByKey, setItemsByKey } from "../../../utils/localDB";

const initialState = {
  taskStatus: ["todo", "in-progress", "done"],
  tasksList: getItemsByKey("tasksList"),
  isDragging: false,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      const newTasksList = [...state.tasksList, action.payload];
      state.tasksList = newTasksList;
      setItemsByKey("tasksList", newTasksList);
    },
    setDraggingStatus: (state, action) => {
      return {
        ...state,
        isDragging: action.payload,
      };
    },
    updateTaskStatus: (state, action) => {
      const { taskId, status, position } = action.payload;
      const updatedTaskList = [...state.tasksList];

      updatedTaskList.find((task) => task.id === taskId).status = status;

      const taskIds = updatedTaskList.map((task) => task.id);
      const currentIndex = taskIds.indexOf(taskId);
      const currentItem = updatedTaskList.splice(currentIndex, 1)[0];
      if (position !== null) {
        // adding item to new position
        updatedTaskList.splice(position, 0, currentItem);
      } else {
        // adding item to the end of the list as position not defined
        updatedTaskList.push(currentItem);
      }
      setItemsByKey("tasksList", updatedTaskList);
      return {
        ...state,
        isDragging: false,
        tasksList: updatedTaskList,
      };
    },
    removeTask: (state, action) => {
  const remainingTasks = state.tasksList.filter(
    (task) => task.id !== action.payload
  );
  setItemsByKey("tasksList", remainingTasks);
  return {
    ...state,
    tasksList: remainingTasks,
  };
}
  },
});

export const { addTask, setDraggingStatus, updateTaskStatus, removeTask } =
  tasksSlice.actions;

export default tasksSlice.reducer;
