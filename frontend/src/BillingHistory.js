import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import './BillingHistory.css';

const BillingHistory = () => {
  const { user } = useContext(UserContext);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState(''); // コピーしましたのメッセージを表示

  useEffect(() => {
    if (user.id) {
      console.log(`User ID being sent: ${user.id}`); // デバッグ情報を表示

      fetch('http://localhost:5000/api/billing_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          if (data.result) {
            setBillingHistory(data.billing_history);
            console.log('Billing history loaded:', data.billing_history); // デバッグ情報を表示
          } else {
            setError(data.error || 'Failed to load billing history');
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching billing history:', error);
          setError('Failed to load billing history');
          setLoading(false);
        });
    }
  }, [user.id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('コピーしました');
      setTimeout(() => setCopyMessage(''), 2000); // 2秒後にメッセージをクリア
    }).catch((err) => {
      console.error('クリップボードへのコピーに失敗しました', err);
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="billing-history">
      <h2>請求履歴</h2>
      {copyMessage && <p className="copy-message">{copyMessage}</p>} {/* コピーしましたのメッセージを表示 */}
      <ul>
        {billingHistory.map((entry, index) => (
          <li key={index}>
            <p>請求金額: {entry.amount} 円</p>
            <p>請求日時: {new Date(entry.created_at).toLocaleString()}</p>
            <p>メッセージ: {entry.message}</p>
            <div className="billing-link-container">
              <span className="billing-link">{entry.billing_link}</span>
              <button 
                className="copy-button" 
                onClick={() => copyToClipboard(entry.billing_link)}
                aria-label="Copy billing link"
              >
                📋
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillingHistory;
