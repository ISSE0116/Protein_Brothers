//Router.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';  // home.jsへのパス
import Login from './login'; // login.jsへのパス
import Recipients from './TransferPage';
import Send from './TransferForm';
import TransferSuccess from './TransferSuccess';
import BillingForm from './BillingForm';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* デフォルトでログインページを表示 */}
        <Route path="/home" element={<Home />} /> {/* Homeページへのルート */}
        <Route path="/send/:id" element={<Send />} /> {/* ユーザーID付きで送金ページへ */}
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/transfer-success" element={<TransferSuccess />} />
        <Route path="/billing/create" element={<BillingForm />} />     
      </Routes>
    </Router>
  );
};

export default AppRouter;
