import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import UserPage from './UserPage';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path='/home' element={<App/>} />
      <Route path='/user' element={<UserPage/>} />
      <Route path='/stats' element={<Stats/>} />
    </Routes>
    
  </BrowserRouter>,
  document.getElementById('root')
);