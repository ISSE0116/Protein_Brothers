// UserContext.js
import React, { createContext, useReducer } from 'react';

// 初期ユーザーデータの定義
const initialState = {
  id: null,
  username: '',
  account_number: null,
  icon: null,
  balance: 0,
  password: ''
};

// アクションの定義
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_USER':
      return initialState; // ユーザー情報をクリア
    default:
      return state;
  }
};

// コンテキストを作成
export const UserContext = createContext();

// プロバイダコンポーネントを作成
export const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
