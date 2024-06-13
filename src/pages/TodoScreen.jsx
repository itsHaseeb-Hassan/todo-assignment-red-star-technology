import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FormInput from '../components/FormInput';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
 import { addTodo, deleteTodo, editTodo, setTodos } from '../Redux/Slice/todoSlice';

const TodoScreen = () => {
  const [todo, setTodo] = useState('');
  const [list, setList] = useState({});

  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();

  let checkList = Object.keys(list)?.length > 0

  const handleTodo = e => {
    setTodo(e.target.value);
  };

  const toggleCompletion = async todoId => {
    const todoToUpdate = todos.find(todo => todo.id === todoId);
    if (todoToUpdate) {
      await updateDoc(doc(db, 'todos', todoId), {
        completed: !todoToUpdate.completed,
      });
    }
  };

  const handleDel = async todoId => {
    await deleteDoc(doc(db, 'todos', todoId));
    dispatch(deleteTodo(todoId));
  };

  const handleEdit = todo => {
    setList(todo);
    setTodo(todo.text);
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, 'todos'), querySnapshot => {
      let todosArr = [];
      querySnapshot.forEach(doc => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      dispatch(setTodos(todosArr));
    });

    return () => unsubscribe();
  }, []);

  const handleAddOrUpdate = async () => {
    if (todo.trim() === '') return;

    try {
      if (checkList) {
        await updateDoc(doc(db, 'todos', list.id), {
          text: todo,
        });
        dispatch(editTodo({ ...list, text: todo }));
      } else {
        const newDocRef = await addDoc(collection(db, 'todos'), {
          text: todo,
          completed: false,
        });
        dispatch(addTodo({
          id: newDocRef.id,
          text: todo,
          completed: false,
        }));
      }
      setTodo('');
      setList({});
    } catch (error) {
      console.error('Error adding/updating document: ', error);
    }
  };

  return (
    <div className="todoScreen">
      <h1>Todo List</h1>
      <div className="containerTodo">
        <FormInput
          type="text"
          placeholder="Enter Your Todo"
          value={todo}
          onChange={handleTodo}
        />
        <button type="button" className="button" onClick={handleAddOrUpdate}>
          {checkList ? 'Update' : 'Add'}
        </button>
      </div>
      <table className="todo-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Todo Item</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo, index) => (
            <tr key={todo.id}>
              <td>{index + 1}</td>
              <td className={todo.completed ? 'completedItem' : ''}>
                {todo.text}
              </td>
              <td className="tableButton">
                <button
                  type="buttons"
                  className="complete-button"
                  onClick={() => toggleCompletion(todo.id)}
                >
                  {todo.completed ? 'Undo' : 'Complete'}
                </button>
                <button
                  onClick={() => handleEdit(todo)}
                  type="button"
                  className="edit-button"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDel(todo.id)}
                  type="button"
                  className="delete-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TodoScreen;
