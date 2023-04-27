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
    //sample movies to render grid of movies
    const mockMovies = [
      { id: 1, title: 'Movie 1' },
      { id: 20, title: 'Movie 20' },
      { id: 30, title: 'Movie 30' }
    ];
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ results: mockMovies })
      })
    );

    //we ignore missing properties, as we care about name and id only
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });

    render(<App />);

    //checking that movie with created sample movie id exists
    await waitFor(() => expect(screen.getByRole('1')).toBeInTheDocument());
    expect(screen.getByRole('20')).toBeInTheDocument();
    expect(screen.getByRole('30')).toBeInTheDocument();

    //checking that only the three sample movies were rendered
    expect(screen.getAllByRole('movie-card').length).toBe(3);
  });

  it('displays error message when no movies are found', async () => {
    global.fetch = jest.fn(() => Promise.reject('Error'));
    render(<App />);
    await waitFor(() => expect(screen.getByText('Sorry, no movies were found!')).toBeInTheDocument());
  });
});