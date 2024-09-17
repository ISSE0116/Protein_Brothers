// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';
import UserInfo from './UserInfo';
import TransferPage from './TransferPage';
import TransferForm from './TransferForm';

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flask バックエンドからユーザー情報を取得
    fetch('http://localhost:5000/api/users')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <h1>ユーザー情報</h1>
      {users.map((user) => (
        <div key={user.id} className="user-card">
          <p><strong>ユーザー名:</strong> {user.username}</p>
          <p><strong>口座番号:</strong> {user.account_number}</p>
          <img src={user.icon_url} alt={`${user.username}のアイコン`} /> 
        </div>
      ))}
    </div>
  );
}

export default App;
