import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <Link to="/chat">Chat</Link>
        </li>
        <li className="nav-item">
          <Link to="/matching">Matching</Link>
        </li>
        <li className="nav-item">
          <Link to="/create-match">Create Match</Link>
        </li>
        <li className="nav-item">
          <Link to="/find-friend">Find Friend</Link>
        </li>
        <li className="nav-item">
          <Link to="/test">Test Screen</Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavBar;
