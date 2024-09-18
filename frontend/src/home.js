// home.js
import React, { useContext } from 'react';
import { UserContext } from './UserContext'; // コンテキストをインポート

const Home = () => {
  const { user } = useContext(UserContext); // コンテキストからユーザー情報を取得

  return (
    <div>
      <h1>Home Page</h1>
      <p>Welcome, {user.username}!</p>
      <p>ID: {user.id}</p>
      <p>Account Number: {user.account_number}</p>
      <p>Balance: {user.balance}</p>
      {user.icon ? (
        <img src={`data:image/png;base64,${user.icon}`} alt="User Icon" />
      ) : (
        <p>No icon available</p>
      )}
    </div>
  );
};

export default Home;
