
import { getItemsByKey, setItemsByKey } from "../../../utils/localDB";
import { fetchIssues } from "./taskOperator";
import { createSlice, isAnyOf } from '@reduxjs/toolkit';
const initialState = {
  taskStatus: ["todo", "in-progress", "done"],
  tasksList: getItemsByKey("tasksList"),
  isDragging: false,
  isLoading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
extraReducers: builder =>
    builder
      .addCase(fetchIssues.fulfilled, (state, { payload }) => {
        state.contacts = payload;
      })
      // .addCase(deleteContact.fulfilled, (state, { payload }) => {
      //   state.contacts = state.contacts.filter(({ id }) => id !== payload);
      // })
      // .addCase(addContact.fulfilled, (state, { payload }) => {
      //   state.contacts = [...state.contacts, payload];
      // })
      // .addCase(updateContacts.fulfilled, (state, { payload }) => {
      //   const index = state.contacts.findIndex(
      //     contact => contact.id === payload.id
      //   );
      //   state.contacts[index] = payload;
      // })
      .addMatcher(
        isAnyOf(
          fetchIssues.pending,
          // deleteContact.pending,
          // addContact.pending,
          // updateContacts.pending
        ),
        state => {
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchIssues.fulfilled,
          // deleteContact.fulfilled,
          // addContact.fulfilled,
          // updateContacts.fulfilled
        ),
        state => {
          state.isLoading = false;
          state.error = null;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchIssues.rejected,
          // deleteContact.rejected,
          // addContact.rejected,
          // updateContacts.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      ),
});
// export const { fetchIssues, /*deleteContacts */} = contactsSlice.actions;

export default tasksSlice.reducer;


// const tasksSlice = createSlice({
//   name: "tasks",
//   initialState,
//   reducers: {
//     addTask: (state, action) => {
//       const newTasksList = [...state.tasksList, action.payload];
//       state.tasksList = newTasksList;
//       setItemsByKey("tasksList", newTasksList);
//     },
//     setDraggingStatus: (state, action) => {
//       return {
//         ...state,
//         isDragging: action.payload,
//       };
//     },
//     updateTaskStatus: (state, action) => {
//       const { taskId, status, position } = action.payload;
//       const updatedTaskList = [...state.tasksList];

//       updatedTaskList.find((task) => task.id === taskId).status = status;

//       const taskIds = updatedTaskList.map((task) => task.id);
//       const currentIndex = taskIds.indexOf(taskId);
//       const currentItem = updatedTaskList.splice(currentIndex, 1)[0];
//       if (position !== null) {
//         // adding item to new position
//         updatedTaskList.splice(position, 0, currentItem);
//       } else {
//         // adding item to the end of the list as position not defined
//         updatedTaskList.push(currentItem);
//       }
//       setItemsByKey("tasksList", updatedTaskList);
//       return {
//         ...state,
//         isDragging: false,
//         tasksList: updatedTaskList,
//       };
//     },
//     removeTask: (state, action) => {
//   const remainingTasks = state.tasksList.filter(
//     (task) => task.id !== action.payload
//   );
//   setItemsByKey("tasksList", remainingTasks);
//   return {
//     ...state,
//     tasksList: remainingTasks,
//   };
// }
//   },
// });

// export const { addTask, setDraggingStatus, updateTaskStatus, removeTask } =
//   tasksSlice.actions;

// export default tasksSlice.reducer;
