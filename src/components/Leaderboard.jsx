import React, { useState, useEffect } from 'react';
import "../styles/Leaderboard.css"

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const storedLeaderboard = JSON.parse(localStorage.getItem('leaderboard'));
    if (storedLeaderboard) {
      setLeaderboard(storedLeaderboard);
    }
  }, []);

  return (
    <div className="leaderboard">
      <h1>Leaderboard</h1>
      <ul>
        {leaderboard.map((entry, index) => (
          <li key={index}>
            <span>{entry.name}</span> - <span>{entry.score}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;