import React, { useState, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from './UserContext';
import './form.css';

const TransferForm = () => {
  const { user, dispatch } = useContext(UserContext);
  const { id: recipientId } = useParams(); // 送金相手のIDを取得
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
          message: message,
        }),
      });

      const data = await response.json();
      if (data.result) {
        dispatch({
          type: 'SET_USER',
          payload: {
            ...user,
            balance: user.balance - parseFloat(amount),
          },
        });
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
    <div className="form-container">
      <h2>送金フォーム</h2>
      <p>送金先: {user.username}</p>
      <p>預金残高: {user.balance} 円</p>
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
        <div>
          <label>メッセージ:</label>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit">送金する</button>
      </form>
    </div>
  );
};

export default TransferForm;
