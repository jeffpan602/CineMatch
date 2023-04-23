import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import App from '../App';

describe('App component', () => {
  it('renders without crashing', () => {
    render(<App />);
    expect(screen.getByRole('movie-grid')).toBeInTheDocument();
  });

  it('displays movies when retrieved from API', async () => {
    const mockMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 2, title: 'Movie 2' },
      { id: 3, title: 'Movie 3' }
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: mockMovies })
      })
    );

    //we ignore missing properties, as we care about name and id only
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    render(<App />);
    await waitFor(() => expect(screen.getByRole('1')).toBeInTheDocument());
    expect(screen.getAllByRole('movie-card').length).toBe(3);
  });

  it('displays error message when no movies are found', async () => {
    global.fetch = jest.fn(() => Promise.reject('Error'));
    render(<App />);
    await waitFor(() => expect(screen.getByText('Sorry, no movies were found!')).toBeInTheDocument());
  });
});
