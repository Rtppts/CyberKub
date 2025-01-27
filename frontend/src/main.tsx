
// import React from 'react';
// @ts-ignore
import React from 'react';
import ReactDOM from 'react-dom/client'; // ใช้ createRoot แทน react-dom
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
