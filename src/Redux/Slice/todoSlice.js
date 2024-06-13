import { createSlice } from '@reduxjs/toolkit';

const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo: (state, action) => {
      const existingTodo = state.todos.find(todo => todo.id === action.payload.id);
      if (!existingTodo) {
        state.todos.push(action.payload);
      }
    },
    deleteTodo: (state, action) => {
      state.todos = state.todos.filter(todo => todo.id !== action.payload);
    },
    editTodo: (state, action) => {
      const index = state.todos.findIndex(todo => todo.id === action.payload.id);
      if (index !== -1) {
        state.todos[index] = action.payload;
      }
    },
    setTodos: (state, action) => {
      state.todos = action.payload;
    },
  },
});

export const { addTodo, deleteTodo, editTodo, setTodos } = todosSlice.actions;

export default todosSlice.reducer;
