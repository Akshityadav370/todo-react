// App.js

import React, { useState, useEffect } from 'react';
import TodoCard from './TodoCard';
import UserSelector from './UserSelector';
import '../Styles/App.css'; // Import the main stylesheet for the app
import { allTasks, createTask } from '../api';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    userId: '',
    title: '',
    completed: false,
  });

  useEffect(() => {
    const staticUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      { id: 3, name: 'User 3' },
      { id: 4, name: 'User 4' },
      { id: 5, name: 'User 5' },
      { id: 6, name: 'User 6' },
      { id: 7, name: 'User 7' },
      { id: 8, name: 'User 8' },
      { id: 9, name: 'User 9' },
      { id: 10, name: 'User 10' },
    ];

    const getAllTasks = async () => {
      const response = await allTasks();
      // console.log(response);
      setTodos(response);
    }

    getAllTasks();
    setUsers(staticUsers);
  }, []);

  const filteredTodos = selectedUser
    ? todos.filter(todo => todo.userId === parseInt(selectedUser))
    : todos;

  const handleAddTodo = async () => {
    
      const response = await createTask(newTodo);
      console.log('New Todo:', response);
      setTodos([newTodo, ...todos]);
  };

  return (
    <div className="app">
      <h1>Todo List App</h1>
      <UserSelector
        users={users}
        selectedUser={selectedUser}
        onSelectUser={event => setSelectedUser(event.target.value)}
      />
      <div className="add-todo">
        <input
          type="number"
          placeholder="User ID"
          value={newTodo.userId}
          onChange={event =>
            setNewTodo({ ...newTodo, userId: event.target.value })
          }
        />
        <input
          type="text"
          placeholder="Title"
          value={newTodo.title}
          onChange={event =>
            setNewTodo({ ...newTodo, title: event.target.value })
          }
        />
        <label>
          Completed:
          <input
            type="checkbox"
            checked={newTodo.completed}
            onChange={event =>
              setNewTodo({ ...newTodo, completed: event.target.checked })
            }
          />
        </label>
        <button onClick={handleAddTodo}>Add</button>
      </div>
      <div className="todo-list">
        {filteredTodos.map(todo => (
          <TodoCard key={todo.id} todo={todo} />
        ))}
      </div>
    </div>
  );
}

export default App;
