import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import './history.css';  // 統一されたCSSファイルを読み込む

const TransferHistory = () => {
  const { user } = useContext(UserContext);
  const [transferHistory, setTransferHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user.id) {
      fetch('http://localhost:5000/api/transfer_history', {
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
            setTransferHistory(data.transfer_history);
          } else {
            setError(data.error || 'Failed to load transfer history');
          }
          setLoading(false);
        })
        .catch(error => {
          console.error('Error fetching transfer history:', error);
          setError('Failed to load transfer history');
          setLoading(false);
        });
    }
  }, [user.id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="history-container">
      <h2 className="history-title">送金履歴</h2>
      <ul className="history-list">
        {transferHistory.map((entry, index) => (
          <li key={index} className="history-item">
            <p>送金先: {entry.recipient_name}</p>
            <p>メッセージ: {entry.message}</p>
            <p>送金金額: {entry.amount} 円</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransferHistory;
