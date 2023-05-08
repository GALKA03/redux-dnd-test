import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectTasks } from "../../redux/reducers/tasksReducer/tasksSelector";
import classes from "./task-container.module.css";
import TaskCard from "../task-card/index";
import verifyTaskStatusUpdate from "../../redux/thunks/verifyTaskStatusUpdate";



const TaskContainer = ({ status }) => {
   const { tasksList, isDragging } = useSelector(selectTasks);
  const tasks= useSelector(selectTasks);
   const dragOverItem = useRef(null); // To store current item insert position
  const dispatch = useDispatch();

  // Drag and Drop will not work without this (Preventing default behavior).
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e) => {
    e.preventDefault();
    try {
      const taskId = +e.dataTransfer.getData("text");
   const newTaskId= dispatch(
      verifyTaskStatusUpdate({
        taskId,
        status,
        position: dragOverItem.current,
      })
 
    );
     console.log('newTaskId',newTaskId)
    } catch (error) {
      console.log(error)
    }
    
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className={`${classes.taskContainer} ${isDragging ? classes.dragging : ""}`}
    >
      <h3 className={classes.status}>{status}</h3>
      {tasksList.map(
        (task, index) =>
          task.status === status && (
            <TaskCard key={task.id} tasklists={tasksList} task={task} index={index} ref={dragOverItem}/>
          )
      )}
    </div>
  );
};

export default TaskContainer;
