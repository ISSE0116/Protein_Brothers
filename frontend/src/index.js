// index.js
import React from 'react';
import App from './App'; // App.jsをインポート
import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');

const root = createRoot(container);

root.render(<App />);
