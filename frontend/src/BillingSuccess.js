import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const BillingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const billingUrl = location.state?.billing_url; // 生成されたURLを取得

  return (
    <div>
      <h2>請求が完了しました！</h2>
      <p>請求URL: <a href={billingUrl}>{billingUrl}</a></p>
      <button onClick={() => navigate('/home')}>ホームに戻る</button>
    </div>
  );
};

export default BillingSuccess;
