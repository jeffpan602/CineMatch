import React from 'react';
import { render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import SearchPage from '../SearchPage';

describe('SearchPage', () => {
  it('should display "Sorry, no movies were found!" when no movies are found', async () => {
    window.history.pushState({}, '', '/search?query=nonexistent-movie');
    const { getByText } = render(<SearchPage />);
    await waitFor(() => {
      expect(getByText('Sorry, no movies were found!')).toBeInTheDocument();
    });
  });

  it('should display movies when movies are found', async () => {
    window.history.pushState({}, '', '/search?query=batman');
    const { getAllByRole } = render(<SearchPage />);
    await waitFor(() => {
      expect(getAllByRole('movie-card')).not.toHaveLength(0);
    });
  });
});