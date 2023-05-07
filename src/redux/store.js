import { configureStore, combineReducers, applyMiddleware } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from './reducers/rootReducer/rootSlice';
import tasksReducer from './reducers/tasksReducer/taskSlice';
import thunkMiddleware from 'redux-thunk';


const persistConfig = {
  key: 'tasks',
  storage,
  whitelist: ['tasks'],
};

const rootPersistConfig = combineReducers({
  root: rootReducer,
  tasks: tasksReducer,
});

const persistedReducer = persistReducer(persistConfig, rootPersistConfig);

// Custom middleware that ignores specified actions
const customMiddleware = store => next => action => {
  const ignoredActions = ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER'];
  if (!ignoredActions.includes(action.type)) {
    return next(action);
  }
};

// Create the store with manual middleware array
export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunkMiddleware, customMiddleware],
});

export const persistor = persistStore(store);



// import { createStore, applyMiddleware } from "redux";
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk"; //Middleware

// import rootReducer from "./reducers/rootReducer";

// const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));

// export default store;
