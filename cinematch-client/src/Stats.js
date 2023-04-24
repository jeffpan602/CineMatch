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
      <span className="titleSpan">
        <h1>Stats</h1>
      </span>
      <button onClick={generatePDF}>Generate PDF</button>
      <p>{message}</p>
    </>
  );
}

export default Stats;



