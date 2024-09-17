// src/UserInfo.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate フックをインポート
import './UserInfo.css';

const UserInfo = ({ user }) => {
  const navigate = useNavigate(); // ページ遷移用のフックを使用

  const handleTransferClick = () => {
    navigate('/transfer'); // 送金ページへ遷移
  };

  return (
    <div className="user-info">
      <img src={user.icon} alt="ユーザアイコン" className="user-icon" />
      <div className="user-details">
        <p><strong>ユーザ名:</strong> {user.userName}</p>
        <p><strong>口座番号:</strong> {user.accountNumber}</p>
        <p><strong>預金残高:</strong> {user.balance}</p>
      </div>
      <button onClick={handleTransferClick} className="transfer-button">送金</button> {/* 送金ボタンを追加 */}
    </div>
  );
}

export default UserInfo;
