import React, { useContext, useState } from 'react';
import { UserContext } from './UserContext';
import './Header.css';

const Header = () => {
  const { user } = useContext(UserContext);
  const [menuOpen, setMenuOpen] = useState(false); // メニューの開閉状態を管理

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <div className="header-content">
        {/* ユーザーロゴ画像を常に表示 */}
          <img src="/images/BankLogo.png" alt="logo" className="bank-logo" />
        {/* ハンバーガーメニュー */}
        <div
          className={`hamburger-menu ${menuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      {/* メニューを開いた状態の表示 */}
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="/home">マイページ</a></li>
          <li><a href="/recipients">送金</a></li>
          <li><a href="/claim">請求</a></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
