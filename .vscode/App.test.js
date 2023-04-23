import React from 'react';
import axios from 'axios';
import { getByRole, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom/extend-expect';
import App from '../App';

describe('App component', () => {

  it('renders App page', async () => {
    await act(async () => {
      const { getByRole } = render(<App />);
      const myComponentElement = getByRole('movie-grid');
      expect(myComponentElement).toBeInTheDocument();
    })
  });

  expect(true).toBe(true);


})