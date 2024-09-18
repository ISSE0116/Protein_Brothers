// src/TransferPage.js
import React, { useState, useEffect } from 'react';
import './TransferPage.css';

const TransferPage = () => {
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Flask バックエンドから送金先のユーザー情報を取得
    fetch('http://localhost:5000/api/recipients')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setRecipients(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="transfer-page">
      <h2>送金先ユーザー一覧</h2>
      <div className="recipients-list">
        {recipients.map((recipient) => (
          <div key={recipient.id} className="recipient-card">
            <img src={recipient.icon} alt={`${recipient.user_name}のアイコン`} className="recipient-icon" />
            <p className="recipient-name">{recipient.user_name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransferPage;
