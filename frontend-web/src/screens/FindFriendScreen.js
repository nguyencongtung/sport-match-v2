import React from 'react';
import './FindFriendScreen.css';
import UserCard from '../components/UserCard';

function FindFriendScreen() {
  const dummyFriends = [
    { id: 1, name: 'Eve', bio: 'Loves volleyball.' },
    { id: 2, name: 'Frank', bio: 'Plays badminton regularly.' },
  ];

  return (
    <div className="find-friend-screen">
      <h2>Find New Friends</h2>
      <div className="friend-list-container">
        {dummyFriends.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {/* Add search and filter functionality */}
    </div>
  );
}

export default FindFriendScreen;
