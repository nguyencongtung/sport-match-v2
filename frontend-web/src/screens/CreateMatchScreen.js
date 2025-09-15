import React, { useState } from 'react';
import './CreateMatchScreen.css';

function CreateMatchScreen() {
  const [matchDetails, setMatchDetails] = useState({
    title: '',
    sport: '',
    location: '',
    date: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMatchDetails(prevDetails => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Match Created:', matchDetails);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="create-match-screen">
      <h2>Create New Match</h2>
      <form onSubmit={handleSubmit} className="create-match-form">
        <div className="form-group">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={matchDetails.title}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sport">Sport:</label>
          <input
            type="text"
            id="sport"
            name="sport"
            value={matchDetails.sport}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={matchDetails.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            value={matchDetails.date}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Match</button>
      </form>
    </div>
  );
}

export default CreateMatchScreen;
