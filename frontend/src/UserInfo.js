// src/UserInfo.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate フックをインポート
import './UserInfo.css';

const UserInfo = () => {
  const navigate = useNavigate(); // ページ遷移用のフックを使用

  const handleTransferClick = () => {
    navigate('/transfer'); // 送金ページへ遷移
  };

  return (
    <div className="user-info">
      <button onClick={handleTransferClick} className="transfer-button">送金</button>
    </div>
  );
}

export default UserInfo;
