import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import CineMatch from '../CineMatch';

jest.mock('axios');

describe('CineMatch', () => {
  it('should show the Movie in the first modal when "View More" is clicked', async () => {
    // Mock the Axios response
    const mockedData = { id: 1, title: 'Mocked Title', poster_path: 'path/to/image.png', release_date: 'April 21st, 2023', overview: 'sample overview' };
    axios.get.mockResolvedValue({ data: mockedData });

    // Render the component
    const { container } = render(<CineMatch {...mockedData} />);

    // Click the "View More" button
    const viewMoreButton = screen.getByText('View More');
    fireEvent.click(viewMoreButton);

    // Wait for the first modal to appear
    const renderedTitle = await waitFor(() => screen.getByRole('main-modal'));

    // Check that data from API renders correctly
    expect(renderedTitle).toBeInTheDocument();                          //title
    expect(screen.getByText(mockedData.title)).toBeInTheDocument();
    expect(container.querySelector('img').getAttribute('src')).toEqual('https://image.tmdb.org/t/p/w500/path/to/image.png');  //image
    expect(screen.getByText(mockedData.overview)).toBeInTheDocument();  //overview

    //Check that the two buttons are rendered ('Add Watched', 'Add to-Watch, and Close)
    const button1 = screen.getByText('Add to Watched List');
    const button2 = screen.getByText('Add to To-Watch List');
    const button3 = screen.getByText('Close');
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
  });

  it('adds movie to to-watch list', async () => {
    const movie = {
      id: 603,
      title: 'The Matrix',
      poster_path: '/lh4aGpd3U9rm9B8Oqr6CUgQLtZL.jpg',
      overview:
        'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    };
    axios.get.mockResolvedValue(movie); //mock the get request from DB

    axios.post.mockResolvedValue({}); // mock the post request to DB

    // Render the component
    const { container } = render(<CineMatch {...movie} />);

    // Click the "View More" button
    const viewMoreButton = screen.getByText('View More');
    fireEvent.click(viewMoreButton);

    // Wait for the first modal to appear
    const renderedTitle = await waitFor(() => screen.getByRole('main-modal'));

    // Click the "Add to To-Watch List" button
    const addToWatchListButton = screen.getByText('Add to To-Watch List');
    fireEvent.click(addToWatchListButton);

    // Wait for the modal to update
    await waitFor(() => {
      const modalAddToWatchListButton = screen.getByText('Add to To-Watch List');
      expect(modalAddToWatchListButton).toBeInTheDocument();
      fireEvent.click(modalAddToWatchListButton);
    });

    // Check that pressing the button posted the data to the DB
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/to_watch/', {
      movie_id: movie.id,
      movie_title: movie.title,
      completed: false,
    });
  });

  it('adds movie to watched list', async () => {
    const movie = {
      id: 603,
      title: 'The Matrix',
      poster_path: '/lh4aGpd3U9rm9B8Oqr6CUgQLtZL.jpg',
      overview:
        'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
    };
    axios.get.mockResolvedValue(movie);

    axios.post.mockResolvedValue({}); // mock the post request


    // Render the component
    const { container } = render(<CineMatch {...movie} />);

    // Click the "View More" button
    const viewMoreButton = screen.getByText('View More');
    fireEvent.click(viewMoreButton);

    // Wait for the first modal to appear
    const renderedTitle = await waitFor(() => screen.getByRole('main-modal'));

    // Click the "Add to Watched List" button
    const addToWatchedListButton = screen.getByText('Add to Watched List');
    fireEvent.click(addToWatchedListButton);

    // wait for the modal to update
    await waitFor(() => {
      const modalAddToWatchedListButton = screen.getByText('Add to Watched List');
      expect(modalAddToWatchedListButton).toBeInTheDocument();
      fireEvent.click(modalAddToWatchedListButton);
    });

    // Check that pressing the button posted the data to the DB
    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/watched/', {
      movie_id: movie.id,
      movie_title: movie.title,
      rating: 5,
      review: '',
    });
  });
});
