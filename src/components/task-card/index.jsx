import React, { forwardRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeTask, setDraggingStatus } from "../../redux/reducers/tasksReducer/taskSlice";
// import { removeFromTaskList, setDraggingStatus } from "redux/actions/tasksActions";
import classes from "./task-card.module.css";
import { selectTasks } from "../../redux/reducers/tasksReducer/tasksSelector";
const TaskCard = forwardRef(({ task, index, tasksList }, ref) => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectTasks)
console.log('cardTasklists', tasksList)
  const removeCard = async () => {
    try {
      await dispatch(removeTask(task.id));
    } catch (error) {
      console.log(error);
    }
  };
  const handleDragStart = async (e) => {
    try {
      e.dataTransfer.setData("text", task.id);
      const drag = await dispatch(setDraggingStatus(true));
      console.log("drag", drag);
    } catch (error) {
      console.log(error);
    }
  };

  //Tracking item insert position
  const handleDragEnter = (position) => (ref.current = position);

  //Resetting item insert position
  const handleDragLeave = () => (ref.current = null);

  return (
    <div
      className={classes.taskCard}
      
      draggable
      onDragEnter={() => handleDragEnter(index)}
      onDragLeave={handleDragLeave}
      onDragStart={handleDragStart}
      onDragEnd={() => dispatch(setDraggingStatus(false))}
    >
      {/* <h3>{title}</h3>
      <p>{comments}</p>
      <a href="url">{url }</a>
      <span onClick={removeCard}>X</span>
      {task.title} */}
    </div>
  );
});

export default TaskCard;
