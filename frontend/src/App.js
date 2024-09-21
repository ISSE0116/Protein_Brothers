import React from 'react';
import AppRouter from './Router'; // ルーティング設定をインポート
import { UserProvider } from './UserContext'; // UserProviderをインポート
import Header from './Header'; // ヘッダーをインポート
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <UserProvider>
      <Router> {/* RouterでHeaderとAppRouterを囲む */}
        <Header /> {/* 全ページ共通のヘッダー */}
        <AppRouter /> {/* ルーティング */}
      </Router>
    </UserProvider>
  );
};

export default App;
