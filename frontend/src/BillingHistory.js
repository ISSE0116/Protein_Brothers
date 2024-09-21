import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import './history.css';  // 統一されたCSSファイルを読み込む

const BillingHistory = () => {
  const { user } = useContext(UserContext);
  const [billingHistory, setBillingHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [copyMessage, setCopyMessage] = useState('');

  useEffect(() => {
    if (user.id) {
      fetch('http://localhost:5000/api/billing_history', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: user.id }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          if (data.result) {
            setBillingHistory(data.billing_history);
          } else {
            setError(data.error || 'Failed to load billing history');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching billing history:', error);
          setError('Failed to load billing history');
          setLoading(false);
        });
    }
  }, [user.id]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopyMessage('コピーしました');
      setTimeout(() => setCopyMessage(''), 2000);
    }).catch(err => {
      console.error('クリップボードへのコピーに失敗しました', err);
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="history-container">
      <h2 className="history-title">請求履歴</h2>
      {copyMessage && <p className="copy-message">{copyMessage}</p>}
      <ul className="history-list">
        {billingHistory.map((entry, index) => (
          <li key={index} className="history-item">
            <p>請求金額: {entry.amount} 円</p>
            <p>請求日時: {new Date(entry.created_at).toLocaleString()}</p>
            <p>メッセージ: {entry.message}</p>
            <div className="link-container">
              <span className="link-text">{entry.billing_link}</span>
              <button className="copy-button" onClick={() => copyToClipboard(entry.billing_link)}>📋</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BillingHistory;
