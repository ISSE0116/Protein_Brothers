// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserInfo from './UserInfo'; // ユーザー情報ページのインポート
import TransferPage from './TransferPage'; // 送金ページのインポート
import TransferForm from './TransferForm'; // 送金フォームページのインポート

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

  const userData = users[0]; // 最初のユーザーを使用

  return (
    <Router>
      <div className="App">
        <h1>送金アプリ</h1>
        {/* App.js のみでユーザー情報を表示 */}
        {userData && (
          <div className="user-card">
            <p><strong>ユーザー名:</strong> {userData.username}</p>
            <p><strong>口座番号:</strong> {userData.account_number}</p>
          </div>
        )}
        {/* ルーティングの設定 */}
        <Routes>
          {/* ユーザー情報を `UserInfo` に渡す */}
          <Route path="/" element={<UserInfo />} /> 
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transfer-form" element={<TransferForm user={userData} />} /> {/* `userData` を渡す */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
