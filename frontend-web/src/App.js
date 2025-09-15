import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ChatScreen from './screens/ChatScreen';
import MatchingScreen from './screens/MatchingScreen';
import CreateMatchScreen from './screens/CreateMatchScreen';
import FindFriendScreen from './screens/FindFriendScreen';
function App() {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/chat" element={<ChatScreen />} />
          <Route path="/matching" element={<MatchingScreen />} />
          <Route path="/create-match" element={<CreateMatchScreen />} />
          <Route path="/find-friend" element={<FindFriendScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
