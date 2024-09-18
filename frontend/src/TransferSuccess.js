import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import './TransferSuccess.css';

const TransferSuccess = () => {
  const navigate = useNavigate(); // ナビゲート用のフックを使用

  const handleBackToHome = () => {
    navigate('/home'); // ホームに戻る
  };

  return (
    <div className="success-page">
      <h1>送金が完了しました！</h1>
      <img src="/images/approval.png" alt="送金完了" className="success-image" />
      <button onClick={handleBackToHome} className="back-to-home-button">
        トップに戻る
      </button>
    </div>
  );
};

export default TransferSuccess;
