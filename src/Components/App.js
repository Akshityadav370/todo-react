// App.js

import React, { useState, useEffect } from 'react';
import TodoCard from './TodoCard';
import UserSelector from './UserSelector';
import '../Styles/App.css'; // Import the main stylesheet for the app

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
    // Fetch users and todos from an API or any other data source
    // For demonstration purposes, we're using static data here
    const staticUsers = [
      { id: 1, name: 'User 1' },
      { id: 2, name: 'User 2' },
      // Add more users
    ];

    const staticTodos = [
      { userId: 1, id: 1, title: 'Learn React', completed: false },
      { userId: 2, id: 2, title: 'Build a Todo App', completed: true },
      // Add more todos
    ];

    setUsers(staticUsers);
    setTodos(staticTodos);
  }, []);

  const filteredTodos = selectedUser
    ? todos.filter(todo => todo.userId === parseInt(selectedUser))
    : todos;

  const handleAddTodo = () => {
    // Logic to add the new todo to the list
    // For demonstration purposes, we're not implementing the actual addition
    console.log('New Todo:', newTodo);
    setNewTodo({
      userId: '',
      title: '',
      completed: false,
    });
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
