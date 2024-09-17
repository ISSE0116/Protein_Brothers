// src/TransferPage.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TransferPage.css';

const TransferPage = () => {
  const navigate = useNavigate();

  // サンプルデータ: 送金先のユーザー情報
  const users = [
    {
      id: 1,
      name: '佐藤 花子',
      icon: 'https://via.placeholder.com/100',
    },
    {
      id: 2,
      name: '鈴木 次郎',
      icon: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      name: '田中 三郎',
      icon: 'https://via.placeholder.com/100',
    },
  ];

  const handleUserClick = (user) => {
    // 選択されたユーザー情報を送金フォームページに渡す
    navigate('/transfer-form', { state: { recipient: user } });
  };

  return (
    <div className="transfer-page">
      <h2>送金先のユーザー一覧</h2>
      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card" onClick={() => handleUserClick(user)}>
            <img src={user.icon} alt={`${user.name}のアイコン`} className="user-icon" />
            <p className="user-name">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferPage;
