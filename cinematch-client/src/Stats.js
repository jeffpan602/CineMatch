import './styles.css'
import React, { useState, useEffect } from 'react';
import CineMatchNavBar from './CineMatchNavBar';
import movie_stats from './movie_stats.pdf';

function Stats() {


  return (
    <>
      <CineMatchNavBar />

      <span className="titleSpan">
        <h1>Stats</h1>
      </span>
      <div className="pdf-container">
        <iframe src={movie_stats} width="100%" height="100%" />
      </div>
    </>
  );
}

export default Stats;
