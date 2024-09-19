import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext'; // ユーザー情報を取得するためのコンテキスト
import './BillingForm.css'; // CSSファイルをインポート

const BillingForm = () => {
  const { user } = useContext(UserContext); // コンテキストからユーザー情報を取得
  const [bill, setBill] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bill || !message) {
      setError('請求額とメッセージを入力してください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/bill', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bill: parseFloat(bill),
          message: message,
          senderId: user.id, // useContextから取得したユーザーIDを使用
        }),
      });

      const data = await response.json();
      if (data.result) {
        setSuccess('請求が完了しました。');
        setBill('');
        setMessage('');
      } else {
        setError(data.error || '請求に失敗しました。');
      }
    } catch (err) {
      console.error('請求エラー:', err);
      setError('請求中にエラーが発生しました。');
    }
  };

  return (
    <div className="billing-form">
      <h2>請求フォーム</h2>
      <p>請求者: {user.username}</p> {/* ユーザー名を表示 */}
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>請求額:</label>
          <input
            type="number"
            value={bill}
            onChange={(e) => setBill(e.target.value)}
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

        <button type="submit">請求する</button>
      </form>
    </div>
  );
};

export default BillingForm;
