//Router.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login';
import Recipients from './TransferPage';
import Send from './TransferForm';
import TransferSuccess from './TransferSuccess';
import BillingForm from './BillingForm';
import BillingSuccess from './BillingSuccess';
import BillingHistory from './BillingHistory';
import TransferHistory from './TransferHistory';

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} /> {/* デフォルトでログインページを表示 */}
      <Route path="/home" element={<Home />} />
      <Route path="/send/:id" element={<Send />} />
      <Route path="/recipients" element={<Recipients />} />
      <Route path="/transfer-success" element={<TransferSuccess />} />
      <Route path="/billing/claim" element={<BillingForm />} />
      <Route path="/billing-success" element={<BillingSuccess />} />
      <Route path="/billing/history" element={<BillingHistory />} />
      <Route path="/transfer-history" element={<TransferHistory />} />
    </Routes>
  );
};

export default AppRouter;
