import { configureStore } from '@reduxjs/toolkit';
import todosReducer from './Slice/todoSlice'; 

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
});

export default store;