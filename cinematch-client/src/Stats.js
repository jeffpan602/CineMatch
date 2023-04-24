import './styles.css'
import React, { useState } from 'react';
import axios from 'axios';
import CineMatchNavBar from './CineMatchNavBar';

function Stats() {
  const [message, setMessage] = useState('');

  const generatePDF = () => {
    axios.post('http://127.0.0.1:8000/generate-pdf/')
      .then(response => setMessage(response.data))
      .catch(error => setMessage(`Error: ${error.message}`))
  };

  return (
    <>
      <CineMatchNavBar />
      <div className='stats-page'>
        <span className="titleSpan">
          <h1>Stats</h1>
        </span>
        <div className='stats-button'>
          <button onClick={generatePDF}>Generate PDF</button>
        </div>
        
        <p>{message}</p>
      </div>
    </>
  );
}

export default Stats;