import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { selectTasks } from "../../redux/reducers/tasksReducer/tasksSelector";
import TaskContainer from "../task-container/index";
// import classes from "./kanban-board.module.css";
// import prepareTask from "redux/thunks/prepareTask";
import { addTask } from "../../redux/reducers/tasksReducer/taskSlice";
import { FolderAddTwoTone } from '@ant-design/icons';
import { Button, Form, Input, Row } from 'antd';
import { nanoid } from 'nanoid';
import { fetchIssues } from "../../redux/reducers/tasksReducer/taskOperator";


const KanbanBoard = () => {

   const { taskStatus } = useSelector(selectTasks);
  const [taskTitle, setTaskTitle] = useState("");
  const dispatch = useDispatch();
   const select = useSelector(selectTasks)
  console.log('select', select.tasksList.id) 
  const [listShow, setListShow] = useState('')
  
  const fechIssues = async () => {
    try {

      setListShow()
      const showFech = await dispatch(fetchIssues()) 
      console.log('showFech',showFech)
  } catch (error) {
    console.log(error)
  }
}

  const handleTaskAdd = async () => {
    try {
      if (taskTitle) {
        const {taskStatus, tasksList}=select
        // const { tasksList } = useSelector(selectTasks);

        const titleExist = tasksList.find(
          (task) => task.title.toLowerCase() === taskTitle.toLowerCase()
        );

        // Preventing action dispatch if task already exists
        if (!titleExist) {
          const newTask = {
            id: nanoid(),
            title: taskTitle,
            status: "todo",
          };
          const add = await dispatch(addTask(newTask));
       console.log('add', add);
        } else {
          toast.error("Task Already exists", { id: "exist" });
        }

        setTaskTitle("");
      } else {
        toast.error("Please input task name first", { id: "name" });
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleEnterKeyDown = (key) => {
    if (key === "Enter") {
      handleTaskAdd();
    }
  };
 const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    
      <Form
      // form={form}
      // onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
      name="form"
      labelCol={{
        flex: '110px',
      }}
      labelAlign="center"
      labelWrap
      wrapperCol={{
        flex: 1,
      }}
      colon={false}
      style={{}}
    >
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form.Item
          style={{
            marginBottom: '0px',
            minWidth: '300px',
          }}
          name="url"
          rules={[
            {
              required: true,
              // message: 'Please input your issues!',
            },
            () => ({
              validator(_, value) {
                if (!value || value.trim().length === 0) {
                  return Promise.reject(new Error('Please input your issues URL without leading or trailing spaces!'));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input placeholder="Enter API URL" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => handleEnterKeyDown(e.key)} />
        </Form.Item>
      
        {/* <input
          type="text"
          value={taskTitle}
          onChange={(e) => setTaskTitle(e.target.value)}
          onKeyDown={(e) => handleEnterKeyDown(e.key)}
          placeholder="Write your task..."
        /> */}
 <Button
          type="submit"
          htmlType="submit"
          style={{
            backgroundColor: 'transparent',
            color: 'white',
            textAlign: 'center',
            width: 'auto',
            padding: '0px',
          }}
          onClick={handleTaskAdd}
        >
          <FolderAddTwoTone twoToneColor="#DEB887" style={{ fill: 'hotpink', fontSize: '32px' }} />
        </Button>

        {/* <button onClick={handleTaskAdd}>Add</button> */}
      </div>
      {/* <div className={classes.containers}> */}
      <Row
style={{
backgroundColor: '#F0FFFF',
alignItems: 'center',
          gap: '30px',
width:'200px',
// gridTemplateColumns: 'repeat(3, 250px)',
justifyContent: 'center',
}}
// gutter={[{ xs: 8, sm: 16, md: 24, lg: 32 }, 20]}
>
        {select.taskStatus.map((status) => (
          <TaskContainer key={status} handleTaskAdd={handleTaskAdd} status={status} />
        ))}
      </Row>
      {/* </div> */}
    </Form>
  );
};

export default KanbanBoard;
