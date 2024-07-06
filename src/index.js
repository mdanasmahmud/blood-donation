import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <div className="absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(100%_90%_at_50%_0%,rgba(255,0,0,0.13)_0,rgba(255,0,0,0)_75%,rgba(255,0,0,0)_100%)]"><App /></div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

