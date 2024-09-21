import React, { useState, useEffect, useContext } from 'react';
import { UserContext } from './UserContext';
import './TransferHistory.css';

const TransferHistory = () => {
  const { user } = useContext(UserContext); // コンテキストからユーザー情報を取得
  const [transferHistory, setTransferHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

useEffect(() => {
  // user.id が null または undefined でないことを確認してから fetch を実行
  if (user.id) {
    console.log(`User ID being sent: ${user.id}`);
    fetch('http://localhost:5000/api/transfer_history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ id: user.id }), // UserContextから取得した送信元IDを送信
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.result) {
          setTransferHistory(data.transfer_history);
        } else {
          setError(data.error || 'Failed to load transfer history');
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching transfer history:', error);
        setError('Failed to load transfer history');
        setLoading(false);
      });
  }
}, [user.id]); // user.id が変わったときに useEffect を再実行

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="transfer-history">
      <h2>送金履歴</h2>
      <ul>
        {transferHistory.map((entry, index) => (
          <li key={index}>
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
