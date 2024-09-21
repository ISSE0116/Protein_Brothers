//Router.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './home';
import Login from './login'; 
import Recipients from './TransferPage';
import Send from './TransferForm';
import TransferSuccess from './TransferSuccess';
import BillingForm from './BillingForm';
import BillingMakelink from './BillingMakelink';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} /> {/* デフォルトでログインページを表示 */}
        <Route path="/home" element={<Home />} />
        <Route path="/send/:id" element={<Send />} /> 
        <Route path="/recipients" element={<Recipients />} />
        <Route path="/transfer-success" element={<TransferSuccess />} />
        <Route path="/billing/create" element={<BillingForm />} />
        <Route path="/billing/makelink" element={<BillingMakelink />} />     
      </Routes>
    </Router>
  );
};

export default AppRouter;
