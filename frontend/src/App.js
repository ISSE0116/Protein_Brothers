// App.js
import React from 'react';
import AppRouter from './Router'; // ルーティング設定をインポート
import { UserProvider } from './UserContext'; // UserProviderをインポート
import Header from './Header'; // ヘッダーをインポート

const App = () => {
  return (
    <UserProvider>
      <Header /> {/* 全ページ共通のヘッダー */}
      <AppRouter /> {/* ルーティング */}
    </UserProvider>
  );
};

export default App;
