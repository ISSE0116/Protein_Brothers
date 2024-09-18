// login.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from './UserContext'; // コンテキストをインポート
import './login.css'; // CSSファイルをインポート

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { dispatch } = useContext(UserContext); // コンテキストからdispatchを取得

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: parseInt(id), password }),
      });

      const data = await response.json();

      if (data.result) {
        dispatch({
          type: 'SET_USER',
          payload: {
            id: data.id,
            username: data.username,
            account_number: data.account_number,
            icon: data.icon,
            balance: data.balance,
            password: data.password,
          }
        });

        navigate('/home'); // ログイン成功、home.jsに遷移
      } else {
        setError('IDまたはパスワードが正しくありません。');
      }
    } catch (err) {
      console.error('ログインエラー:', err);
      setError('ログイン中にエラーが発生しました。');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>ログイン</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div>
            <label>ID:</label>
            <input
              type="number"
              value={id}
              onChange={(e) => setId(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">ログイン</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
