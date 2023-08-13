// TodoCard.js

import React, { useState, useEffect, useRef } from "react";
import "../Styles/TodoCard.css"; // Import the stylesheet for the TodoCard
import { deleteTask, updateTask } from "../api";

function TodoCard({ todo }) {
  const [existingTodo, setExistingTodo] = useState(todo);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const [deleted, setDeleted] = useState(false);
  const cardRef = useRef(null);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTodo((prevTodo) => ({
      ...prevTodo,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {

    const response = await updateTask(editedTodo.id, editedTodo);
    console.log("Updated Todo:", response);
    setExistingTodo(response);
    setIsEditing(false);
  };

  const handleDelete = async () => {

    const response = await deleteTask(todo.id);
    console.log(response);

    setDeleted(true);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cardRef.current && !cardRef.current.contains(event.target)) {
        setIsEditing(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  

  return deleted ? <div></div> : (
    <div
      className={`todo-card ${isEditing ? "editing" : ""} ${
        existingTodo.completed ? "completed" : ""
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
          existingTodo.title
        )}
      </h2>
      <p>
        User ID:
        {isEditing ? (
          <input
            type="number"
            name="userId"
            value={editedTodo.userId}
            onChange={handleInputChange}
          />
        ) : (
          existingTodo.userId
        )}
      </p>
      <p>
        {isEditing ? (
          <input
            type="checkbox"
            name="completed"
            value={editedTodo.completed}
            onChange={(event) =>
              setEditedTodo({ ...editedTodo, completed: event.target.checked })
            }
          />
        ) : existingTodo.completed ? (
          "Completed"
        ) : (
          "Not completed"
        )}
      </p>
      <div className="buttons">
        {isEditing ? (
          <>
            <button className="update-button" onClick={handleUpdate}>
              Update
            </button>
            <button className="delete-button" onClick={handleDelete}>Delete</button>
          </>
        ) : (
          <button className="edit-button" onClick={() => setIsEditing(true)}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
}

export default TodoCard;
