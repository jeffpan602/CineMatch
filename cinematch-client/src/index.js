import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import App2 from './App2';
import UserPage from './UserPage';
import Stats from './Stats'

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<App />} />
      <Route exact path='/home' element={<App />} />
      <Route path='/user' element={<UserPage />} />
      <Route path='/stats' element={<Stats />} />
      <Route path='/recommended' element={<App2 />} />
    </Routes>

  </BrowserRouter>,
  document.getElementById('root')
);