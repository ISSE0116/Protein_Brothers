import React, { useContext, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocationをインポート
import { UserContext } from './UserContext';
import './Header.css';

const Header = () => {
  const { dispatch } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // 現在のページのURLを取得

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // UserContextをリセット
    dispatch({ type: 'CLEAR_USER' });
    // ログイン画面に遷移
    navigate('/');
  };

  // ログインページではハンバーガーメニューを表示しない
  const isLoginPage = location.pathname === '/';

  return (
    <header className="header">
      <div className="header-content">
        {/* ユーザーロゴ画像を常に表示 */}
        <img src="/images/BankLogo.png" alt="logo" className="bank-logo" />
        
        {!isLoginPage && (
          <>
            {/* ハンバーガーメニュー */}
            <div
              className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
              onClick={toggleMenu}
            >
              <span></span>
              <span></span>
              <span></span>
            </div>
          </>
        )}
      </div>

      {/* メニューを開いた状態の表示 */}
      {!isLoginPage && (
        <nav className={`menu ${menuOpen ? 'open' : ''}`}>
          <ul>
            <li><a href="/home">マイページ</a></li>
            <li><a href="/recipients">送金</a></li>
            <li><a href="/billing/claim">請求</a></li>
            <li><a href="/transfer-history">送金履歴</a></li>
            <li><a href="/billing/history">請求履歴</a></li>
            <li><button className="logout-button" onClick={handleLogout}>ログアウト</button></li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default Header;
