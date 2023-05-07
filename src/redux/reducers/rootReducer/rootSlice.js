import { combineReducers } from '@reduxjs/toolkit';
import tasksReducer from '../tasksReducer/taskSlice';

const rootReducer = combineReducers({
  tasks: tasksReducer,
});

export default rootReducer;