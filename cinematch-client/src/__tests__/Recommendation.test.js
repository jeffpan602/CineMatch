import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import RecommendationPage from '../RecommendationPage';
import '@testing-library/jest-dom';
import axios from 'axios';

jest.mock('axios');

const mockMovies = [
  {
    id: 1,
    title: 'Mock Movie 1',
    poster_path: '/mock-poster-1.jpg',
    overview: 'This is a mock movie 1',
    vote_average: 7.5
  },
  {
    id: 2,
    title: 'Mock Movie 2',
    poster_path: '/mock-poster-2.jpg',
    overview: 'This is a mock movie 2',
    vote_average: 8.0
  }
];

describe('RecommendationPage', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({
      data: [
        {
          movie_id: 1,
          rating: 7
        },
        {
          movie_id: 2,
          rating: 9
        }
      ]
    });
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('renders message when there are no movies to recommend', async () => {
    axios.get.mockResolvedValueOnce({
      data: []
    });

    render(<RecommendationPage />);

    const message = await screen.findByText("Start rating movies to get recommendations!");
    expect(message).toBeInTheDocument();
  });
});
