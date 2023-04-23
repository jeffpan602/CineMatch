import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react';
import UserPage from '../UserPage';
import axios from 'axios';

jest.mock('axios');

describe('UserPage', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('should render "No Movies in To-Watch List" if toWatch list is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: [] });

    let container;
    await act(async () => {
      const { container: c } = render(<UserPage />);
      container = c;
    });

    expect(container.querySelector('.titleSpan h1').textContent).toBe('User Page');

    const message = container.querySelector('[role="toWatchEmpty"]');
    expect(message.textContent).toBe('No Movies in To-Watch List');
  });

  it('should render "No Movies in To-Watch List" if toWatch list is empty', async () => {
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: [] });

    let container;
    await act(async () => {
      const { container: c } = render(<UserPage />);
      container = c;
    });

    expect(container.querySelector('.titleSpan h1').textContent).toBe('User Page');

    const message = container.querySelector('[role="watchedEmpty"]');
    expect(message.textContent).toBe('No Movies in Watched List');
  });

  it('renders watched and to-watch lists', async () => {
    const watchedList = [
      { movie_id: 1, movie_title: 'Movie 1', rating: 8, review: 'Great movie' },
      { movie_id: 2, movie_title: 'Movie 2', rating: 7, review: 'Good movie' }
    ];
    const toWatchList = [
      { movie_id: 3, movie_title: 'Movie 3', completed: false },
      { movie_id: 4, movie_title: 'Movie 4', completed: true }
    ];
    axios.get.mockImplementation((url) => {
      switch (url) {
        case 'http://127.0.0.1:8000/api/watched/':
          return Promise.resolve({ data: watchedList });
        case 'http://127.0.0.1:8000/api/to_watch/':
          return Promise.resolve({ data: toWatchList });
        default:
          return Promise.reject(new Error('not found'));
      }
    });

    let container;
    await act(async () => {
      const { container: c } = render(<UserPage />);
      container = c;
    });

    expect(container.querySelector('.titleSpan h1').textContent).toBe('User Page');
    expect(container.querySelectorAll('table[role="tableToWatch"] tbody tr').length).toBe(toWatchList.length);
    expect(container.querySelectorAll('table[role="tableWatched"] tbody tr').length).toBe(toWatchList.length);
  });

  it('should call handleToWatchDelete when "Delete" button is clicked in toWatch list', async () => {
    const toWatchList = [{ movie_id: 1, movie_title: 'Movie 1', completed: false }];

    axios.get.mockResolvedValueOnce({ data: [] });
    axios.get.mockResolvedValueOnce({ data: toWatchList });
    axios.delete.mockResolvedValueOnce({});

    let container;
    await act(async () => {
      const { container: c } = render(<UserPage />);
      container = c;
    });

    const deleteButton = container.querySelector('[role="toWatchDelete"]');
    await waitFor(() => container.querySelectorAll('tbody tr').length === toWatchList.length);
    fireEvent.click(deleteButton);

    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:8000/api/to_watch/1/'));

  });

  it('should call handleToWatchDelete when "Delete" button is clicked in toWatch list', async () => {
    const watchedList = [{ movie_id: 1, movie_title: 'Movie 1', completed: false }];

    axios.get.mockResolvedValueOnce({ data: watchedList });
    axios.get.mockResolvedValueOnce({ data: [] });
    axios.delete.mockResolvedValueOnce({});

    let container;
    await act(async () => {
      const { container: c } = render(<UserPage />);
      container = c;
    });

    const deleteButton = container.querySelector('[role="watchedDelete"]');
    await waitFor(() => container.querySelectorAll('tbody tr').length === watchedList.length);
    fireEvent.click(deleteButton);

    await waitFor(() => expect(axios.delete).toHaveBeenCalledWith('http://127.0.0.1:8000/api/watched/1/'));

  });
});