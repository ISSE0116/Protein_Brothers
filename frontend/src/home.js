import React, { useContext } from 'react';
import { UserContext } from './UserContext'; // コンテキストをインポート
import './home.css'

const Home = () => {
  const { user } = useContext(UserContext); // コンテキストからユーザー情報を取得

  return (
    <div className="container">
      <p className="greeting">こんにちは、{user.username}さん</p>
      
      <div className="icon-container">
        {user.icon ? (
          <img src={`data:image/png;base64,${user.icon}`} alt="User Icon" />
        ) : (
          <div className="icon-placeholder"></div>
        )}
      </div>
      
      <div className="info-box">
        <p className="info-label">口座番号:</p>
        <p className="info-value">{user.account_number}</p>
      </div>
      
      <div className="info-box">
        <p className="info-label">残高:</p>
        <p className="info-value">¥{user.balance}</p>
      </div>
    </div>
  );
};

export default Home;
