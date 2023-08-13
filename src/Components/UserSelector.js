// UserSelector.js

import React from 'react';
import '../Styles/UserSelector.css'; // Import the stylesheet for the UserSelector

function UserSelector({ users, selectedUser, onSelectUser }) {
  return (
    <div className="user-selector">
      <p>Select User:</p>
      <select value={selectedUser} onChange={onSelectUser}>
        <option value="">All Users</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            User {user.id}
          </option>
        ))}
      </select>
    </div>
  );
}

export default UserSelector;
