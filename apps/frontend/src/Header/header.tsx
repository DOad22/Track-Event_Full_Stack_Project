import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

const Header: React.FC = () => {
  return (
    <header className="header">
      <h1>Game Tracking</h1>
      <nav>
        <ul>
          <li><Link to="/create">Event Creator</Link></li>
          <li><Link to="/participants">Participants</Link></li>
          <li><Link to="/scores">Scores</Link></li>
          <li><Link to="/past">Past Events</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
