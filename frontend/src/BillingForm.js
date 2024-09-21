import React, { useState, useContext } from 'react';
import { UserContext } from './UserContext'; // ユーザー情報を取得するためのコンテキスト
import { useNavigate } from 'react-router-dom'; // 画面遷移用
import './BillingForm.css'; // CSSファイルをインポート

const BillingForm = () => {
  const { user } = useContext(UserContext); // コンテキストからユーザー情報を取得
  const [bill, setBill] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate(); // navigateを初期化

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!bill || !message) {
      setError('請求額とメッセージを入力してください。');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/post_billing', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bill: parseFloat(bill),
          message: message,
          id: user.id, // useContextから取得したユーザーIDを使用
        }),
      });

      const data = await response.json();
      if (data.result) {
        // 請求が成功した場合、生成されたURLを表示するページに遷移
        navigate('/billing-success', { state: { billing_url: data.billing_url } });
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
