import React from 'react';
import './ProfileScreen.css';
import UserCard from '../components/UserCard';

function ProfileScreen() {
  const dummyUser = {
    name: 'John Doe',
    bio: 'A passionate sports enthusiast!',
  };

  return (
    <div className="profile-screen">
      <h2>My Profile</h2>
      <UserCard user={dummyUser} />
      {/* Add more profile details and edit options */}
    </div>
  );
}

export default ProfileScreen;
