import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import moment from 'moment';
import MovieCard from '../components/MovieCard';

jest.mock('axios');
const API_IMG = 'https://image.tmdb.org/t/p/w500/';

const mockMovie = {
  id: 1,
  title: "Test Movie",
  poster_path: "test.jpg",
  vote_average: 7.5,
  release_date: moment().subtract(1, "year").format("YYYY-MM-DD"),
  overview: "This is a test movie.",
};

describe('MovieCard', () => {
  beforeEach(() => {
    axios.get.mockImplementation((url) => {
      switch (url) {
        case "http://127.0.0.1:8000/api/to_watch/":
          return Promise.resolve({ data: [] });
        case "http://127.0.0.1:8000/api/watched/":
          return Promise.resolve({ data: [] });
        default:
          return Promise.reject(new Error("not found"));
      }
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders movie title and poster", () => {
    render(<MovieCard {...mockMovie} />);

    const titleElement = screen.getByText(mockMovie.title);
    expect(titleElement).toBeInTheDocument();

    const posterElement = screen.getByRole("img");
    expect(posterElement).toBeInTheDocument();
    expect(posterElement).toHaveAttribute(
      "src",
      `${API_IMG}${mockMovie.poster_path}`
    );
  });

  it("opens modal when clicked", async () => {
    render(<MovieCard {...mockMovie} />);

    fireEvent.click(screen.getByRole(1));

    await waitFor(() => {
      expect(screen.getByRole("main-modal")).toBeInTheDocument();
    });

    //Check that the two buttons are rendered('Add Watched', 'Add to-Watch, and Close)
    const button1 = screen.getByText('Add to Watched List');
    const button2 = screen.getByText('Add to To-Watch List');
    const button3 = screen.getByText('Close');
    expect(button1).toBeInTheDocument();
    expect(button2).toBeInTheDocument();
    expect(button3).toBeInTheDocument();
  });

  it("adds movie to to-watch list when clicked", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<MovieCard {...mockMovie} />);
    fireEvent.click(screen.getByRole(1));
    const renderedTitle = await waitFor(() => screen.getByRole('main-modal'));

    fireEvent.click(screen.getByText("Add to To-Watch List"));
    const addToWatchListButton = screen.getAllByText('Add to To-Watch List')[1];

    await waitFor(() => {
      expect(screen.queryByRole("toWatch-modal")).toBeInTheDocument();
      fireEvent.click(addToWatchListButton);
    });



    expect(axios.post).toHaveBeenCalledWith('http://127.0.0.1:8000/api/to_watch/', {
      movie_id: mockMovie.id,
      movie_title: mockMovie.title,
      completed: false,
    });
  });

  it("adds movie to watched list when clicked", async () => {
    axios.post.mockResolvedValueOnce({ data: {} });

    render(<MovieCard {...mockMovie} />);
    fireEvent.click(screen.getByRole(1));
    const renderedTitle = await waitFor(() => screen.getByRole('main-modal'));

    fireEvent.click(screen.getByText("Add to Watched List"));
    const addtoWatchedListButton = screen.getAllByText('Add to Watched List')[1];

    await waitFor(() => {
      expect(screen.queryByRole("watched-modal")).toBeInTheDocument();
      fireEvent.click(addtoWatchedListButton);
    });

    expect(axios.post).toHaveBeenCalledWith(
      "http://127.0.0.1:8000/api/watched/",
      {
        movie_id: mockMovie.id,
        movie_title: mockMovie.title,
        rating: 5,
        review: "",
      }
    );
  });
});