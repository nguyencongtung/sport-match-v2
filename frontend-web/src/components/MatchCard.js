import React from 'react';
import './MatchCard.css';

function MatchCard({ match }) {
  return (
    <div className="match-card">
      <p className="match-title">{match.title}</p>
      <p className="match-sport">{match.sport}</p>
      <p className="match-location">{match.location}</p>
      <p className="match-date">{match.date}</p>
      {/* Add more match details here */}
    </div>
  );
}

export default MatchCard;
