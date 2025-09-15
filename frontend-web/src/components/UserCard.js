import React from 'react';
import './UserCard.css';

function UserCard({ user }) {
  return (
    <div className="user-card">
      <p className="user-name">{user.name}</p>
      <p className="user-bio">{user.bio}</p>
      {/* Add more user details here */}
    </div>
  );
}

export default UserCard;
