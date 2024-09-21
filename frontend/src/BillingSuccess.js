import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './success.css';

const BillingSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const billingUrl = location.state?.billing_url; // 生成されたURLを取得

  useEffect(() => {
    // ページロード時にvibrateクラスを追加
    const imgElement = document.querySelector('.success-image');
    imgElement.classList.add('vibrate');

    const timer = setTimeout(() => {
      imgElement.classList.remove('vibrate');
    }, 500);

    // コンポーネントがアンマウントされるときにタイマーをクリア
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-page">
      <h2>請求リンクを発行しました！</h2>
      <img src={`${process.env.PUBLIC_URL}/images/approval.png`} alt="成功" className="success-image" />
      <div className="billing-link-container">
        <span className="billing-url">{billingUrl}</span>
        <button
          className="copy-button"
          onClick={() => {
            navigator.clipboard.writeText(billingUrl);
            alert('リンクがコピーされました');
          }}
        >
          📋
        </button>
      </div>
      <button className="success-button" onClick={() => navigate('/home')}>ホームに戻る</button>
    </div>
  );
};

export default BillingSuccess;
