import React, { useEffect, useState } from 'react';
import './success.css'; // 共通のCSSファイルをインポート

const TransferSuccess = () => {
  const [vibrate, setVibrate] = useState(false);

  useEffect(() => {
    setVibrate(true);
    const timer = setTimeout(() => {
      setVibrate(false);
    }, 1000); // 1秒間だけ振動アニメーションを実行

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="success-page">
      <h2>送金が完了しました！</h2>
      <img 
        src={`${process.env.PUBLIC_URL}/images/approval.png`} 
        alt="成功" 
        className={`success-image ${vibrate ? 'vibrate' : ''}`} 
      />
      <button className="success-button" onClick={() => window.location.href = '/home'}>
        ホームに戻る
      </button>
    </div>
  );
};

export default TransferSuccess;
