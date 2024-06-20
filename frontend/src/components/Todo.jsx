import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Todo() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/todo/todos/');
        setTodos(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const addTodo = async () => {
    if (newTodo.trim() === '') return;
    try {
      const response = await axios.post('http://127.0.0.1:8000/todo/todos/', {
        text: newTodo,
        completed: false,
      });
      setTodos((prevTodos) => [...prevTodos, response.data]);
      setNewTodo('');
    } catch (error) {
      console.log(error);
    }
  };

  const removeTodo = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:8000/todo/todos/${id}/`);
      setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const toggleComplete = async (id) => {
    const todo = todos.find(todo => todo.id === id);
    if (!todo) return; // Ensure todo exists
    try {
      const response = await axios.patch(`http://127.0.0.1:8000/todo/todos/${id}/`, {
        completed: !todo.completed,
      });
      setTodos((prevTodos) =>
        prevTodos.map(todo => (todo.id === id ? response.data : todo))
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder='Add new todo here'
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
              <button onClick={() => toggleComplete(todo.id)}>
                {todo.completed ? 'Uncomplete' : 'Complete'}
              </button>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Todo;
