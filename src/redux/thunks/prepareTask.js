import { toast } from "react-hot-toast";
import { addTask } from "../reducers/taskSlice";
import { nanoid } from 'nanoid';

const prepareTask = (taskTitle) => {
  return (dispatch, getState) => {
    const { tasksList } = getState().tasks;

    const titleExist = tasksList.find(
      (task) => task.title.toLowerCase() === taskTitle.toLowerCase()
    );

    //preventing action dispatch if task already exist
    if (!titleExist) {
      const newTask = {
        id: nanoid(),
        title: taskTitle,
        status: "todo",
      };
     const addRedux= dispatch(addTask(newTask));
    console.log('addRedux',addRedux)
    } else {
      toast.error("Task Already exist", { id: "exist" });
    }
  };
};

export default prepareTask; 




    // <Form
    //   form={form}
    //   onFinish={onFinish}
    //   onFinishFailed={onFinishFailed}
    //   autoComplete="off"
    //   name="inputUrl"
    //   labelCol={{
    //     flex: '110px',
    //   }}
    //   labelAlign="center"
    //   labelWrap
    //   wrapperCol={{
    //     flex: 1,
    //   }}
    //   colon={false}
    //   style={{}}
    // >
    //   <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    //     <Form.Item
    //       style={{
    //         marginBottom: '0px',
    //         minWidth: '300px',
    //       }}
    //       name="url"
    //       rules={[
    //         {
    //           required: true,
    //           // message: 'Please input your issues!',
    //         },
    //         () => ({
    //           validator(_, value) {
    //             if (!value || value.trim().length === 0) {
    //               return Promise.reject(new Error('Please input your issues URL without leading or trailing spaces!'));
    //             }
    //             return Promise.resolve();
    //           },
    //         }),
    //       ]}
    //     >
    //       <Input placeholder="Enter API URL" value={url} onChange={handleUrlChange} />
    //     </Form.Item>
    //     <Button
    //       type="submit"
    //       htmlType="submit"
    //       style={{
    //         backgroundColor: 'transparent',
    //         color: 'white',
    //         textAlign: 'center',
    //         width: 'auto',
    //         padding: '0px',
    //       }}
    //       onClick={handleFetchIssues}
    //     >
    //       <FolderAddTwoTone twoToneColor="#DEB887" style={{ fill: 'hotpink', fontSize: '32px' }} />
    //     </Button>
    //   </div>
    //   <div style={{ marginTop: '10px' }}>
    //     {/* Additional form fields or components */}
    //   </div>
    // </Form>