import React from 'react';
import axios from 'axios';
import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom'
import Stats from '../Stats';

jest.mock('react-resize-detector', () => ({
  __esModule: true,
  default: jest.fn().mockReturnValue({
    observe: jest.fn(),
    unobserve: jest.fn(),
  }),
}));

jest.mock('axios');

describe('Stats', () => {
  beforeEach(() => {
    axios.get.mockClear();
  });

  it('should render stats', async () => {
    const watched = [
      { movie_id: 1, rating: 7 },
      { movie_id: 2, rating: 8 },
    ];
    const genres = [
      { id: 28, name: 'Action' },
      { id: 12, name: 'Adventure' },
      { id: 14, name: 'Fantasy' },
    ];
    const credits = {
      cast: [{ name: 'Actor 1' }, { name: 'Actor 2' }],
      crew: [{ name: 'Director 1', job: 'Director' }],
    };
    const movie = {
      id: 1,
      runtime: 120,
      release_date: '2021-01-01',
      genres,
    };
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => { });
    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'http://127.0.0.1:8000/api/watched/':
          return Promise.resolve({ data: watched });
        case 'https://api.themoviedb.org/3/movie/1/credits?api_key=b5d2f69cf0491ce4441c4d04c4befc3d':
          return Promise.resolve({ data: credits });
        case 'https://api.themoviedb.org/3/movie/1?api_key=b5d2f69cf0491ce4441c4d04c4befc3d':
          return Promise.resolve({ data: movie });
        default:
          throw new Error(`Invalid URL: ${url}`);
      }
    });

    render(<Stats />);

    await waitFor(() => {
      expect(screen.getByText('Your Genre Preferences')).toBeInTheDocument();
      expect(screen.getByText('Your Reviews')).toBeInTheDocument();
      expect(screen.getByText('Total Runtime Watched:')).toBeInTheDocument();
      expect(screen.getByText('Most Watched Decade:')).toBeInTheDocument();
    });
  });
});
