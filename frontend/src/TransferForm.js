// src/TransferForm.js
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './TransferForm.css';

const TransferForm = ({ user }) => {
  const location = useLocation();
  const recipient = location.state?.recipient; // 送金先のユーザー情報を受け取る

  const [amount, setAmount] = useState(''); // 送金金額の状態を管理

  // `user` が未定義の場合の対策
  if (!user) {
    return <div>ユーザー情報が見つかりません。</div>;
  }

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleSubmit = () => {
    // 送金処理のロジックをここに記述
    console.log(`送金先: ${recipient ? recipient.name : '不明'}, 金額: ${amount}円`);
  };

  return (
    <div className="transfer-form">
      <h2>送金処理画面</h2>
      {recipient && (
        <div className="recipient-info">
          <img src={recipient.icon} alt={`${recipient.name}のアイコン`} className="recipient-icon" />
          <p>{recipient.name}</p>
        </div>
      )}
      <p>送金可能な上限金額: {user.balance}円</p>
      <input
        type="number"
        placeholder="送金金額を入力"
        value={amount}
        onChange={handleChange}
        min="0"
        max={user.balance}
      />
      <button onClick={handleSubmit} disabled={!amount}>送金する</button>
    </div>
  );
};

export default TransferForm;
