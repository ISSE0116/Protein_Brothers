import React, { createContext, useReducer, useEffect } from 'react';

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
      // ユーザー情報をlocalStorageに保存
      localStorage.setItem('user', JSON.stringify(action.payload));
      return {
        ...state,
        ...action.payload
      };
    case 'CLEAR_USER':
      // localStorageからユーザー情報を削除
      localStorage.removeItem('user');
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

  // localStorageからユーザー情報を読み込む
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      dispatch({ type: 'SET_USER', payload: JSON.parse(storedUser) });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};
