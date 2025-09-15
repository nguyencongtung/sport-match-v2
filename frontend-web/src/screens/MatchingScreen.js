import React from 'react';
import './MatchingScreen.css';
import UserCard from '../components/UserCard';

function MatchingScreen() {
  const dummyUsers = [
    { id: 1, name: 'Alice', bio: 'Loves basketball and hiking.' },
    { id: 2, name: 'Bob', bio: 'Enjoys soccer and running.' },
    { id: 3, name: 'Charlie', bio: 'Passionate about tennis.' },
  ];

  return (
    <div className="matching-screen">
      <h2>Find Your Match!</h2>
      <div className="user-cards-container">
        {dummyUsers.map(user => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
      {/* Add swipe/match functionality */}
    </div>
  );
}

export default MatchingScreen;
