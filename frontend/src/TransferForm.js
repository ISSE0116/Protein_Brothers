//TransferForm.js
import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import './TransferForm.css';

const TransferForm = () => {
  const { user, dispatch } = useContext(UserContext);
  const { id: recipientId } = useParams(); // 送金相手のIDを取得
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 残高チェック
    if (parseFloat(amount) > user.balance) {
      setError('残高不足です。');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/remittance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          senderId: user.id,
          recipientId: recipientId,
          amount: parseFloat(amount),
        }),
      });

      const data = await response.json();
      if (data.result) {
        // ユーザー全体の情報を更新（残高以外の情報も維持）
        dispatch({
          type: 'SET_USER',
          payload: {
            ...user, // 既存のユーザー情報を保持
            balance: user.balance - parseFloat(amount), // 残高のみ更新
          },
        });
        // 成功ページに遷移
        navigate('/transfer-success');
      } else {
        setError(data.error || '送金に失敗しました。');
      }
    } catch (err) {
      console.error('送金エラー:', err);
      setError('送金中にエラーが発生しました。');
    }
  };

  return (
    <div className="transfer-form">
      <h2>送金フォーム</h2>
      <p>送金先のユーザーID: {recipientId}</p>
      <p>残高: {user.balance} 円</p>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>送金金額:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
        <button type="submit">送金する</button>
      </form>
    </div>
  );
};

export default TransferForm;
