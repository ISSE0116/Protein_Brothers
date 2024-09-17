// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import UserInfo from './UserInfo';
import TransferPage from './TransferPage';
import TransferForm from './TransferForm'; // 新しい送金処理ページをインポート

function App() {
  const userData = {
    icon: 'https://via.placeholder.com/100',
    accountNumber: '1234-5678-9012',
    userName: '山田 太郎',
    balance: 1000000, // 預金残高を数値として保持
  };

  return (
    <Router>
      <div className="App">
        <h1>ユーザ情報ページ</h1>
        <Routes>
          <Route path="/" element={<UserInfo user={userData} />} />
          <Route path="/transfer" element={<TransferPage />} />
          <Route path="/transfer-form" element={<TransferForm user={userData} />} /> {/* 送金処理ページのルート */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
