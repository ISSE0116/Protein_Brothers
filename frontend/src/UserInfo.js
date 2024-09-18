// UserContext.js
import React, { createContext, useState } from 'react';

// ユーザー情報のコンテキストを作成
export const UserContext = createContext();

// UserProviderコンポーネントを作成
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    id: null,
    username: '',
    account_number: null,
    icon: null,
    balance: 0,
    password: ''
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
