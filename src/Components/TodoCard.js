// TodoCard.js

import React, { useState, useEffect, useRef } from 'react';
import '../Styles/TodoCard.css'; // Import the stylesheet for the TodoCard

function TodoCard({ todo }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const cardRef = useRef(null);

  const handleInputChange = event => {
    const { name, value } = event.target;
    setEditedTodo(prevTodo => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleUpdate = () => {
    // Logic to update the todo using editedTodo data
    // For demonstration purposes, we're not implementing the actual update
    console.log('Updated Todo:', editedTodo);
    setIsEditing(false);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`todo-card ${isEditing ? 'editing' : ''} ${
        todo.completed ? 'completed' : ''
      }`}
      ref={cardRef}
    >
      <h2>
        {isEditing ? (
          <input
            type="text"
            name="title"
            value={editedTodo.title}
            onChange={handleInputChange}
          />
        ) : (
          todo.title
        )}
      </h2>
      <p>
        User ID: {todo.userId}
        {isEditing && (
          <input
            type="number"
            name="userId"
            value={editedTodo.userId}
            onChange={handleInputChange}
          />
        )}
      </p>
      <p>{todo.completed ? 'Completed' : 'Not completed'}</p>
      <div className="buttons">
        {isEditing ? (
          <>
            <button className="update-button" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete-button">Delete</button>
          </>
        ) : (
          <button
            className="edit-button"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
