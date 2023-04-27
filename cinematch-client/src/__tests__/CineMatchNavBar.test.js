import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CineMatchNavBar from '../CineMatchNavBar';

describe('Navbar component', () => {
	it('renders Navbar with correct links', () => {
		render(<CineMatchNavBar />);
		expect(screen.getByText('CineMatch')).toBeInTheDocument();
		expect(screen.getByText('Trending')).toBeInTheDocument();
		expect(screen.getByText('User Page')).toBeInTheDocument();
		expect(screen.getByText('Stats')).toBeInTheDocument();
	});

	it('should render the form with the correct input and button', () => {
    const { getByPlaceholderText, getByRole } = render(<CineMatchNavBar />);
    expect(getByPlaceholderText('Movie Search')).toBeInTheDocument();
    expect(getByRole('searchBtn')).toBeInTheDocument();
  });

	it('should update the query state when the user types into the search field', () => {
    const { getByPlaceholderText } = render(<CineMatchNavBar />);
    const searchInput = getByPlaceholderText('Movie Search');
    fireEvent.change(searchInput, { target: { value: 'Star Wars' } });
    expect(searchInput.value).toBe('Star Wars');
  });

	// it('should call the searchMovie function when the search button is clicked', async () => {
	// 	const searchMovie = jest.fn();
	// 	const { getByRole } = render(<CineMatchNavBar />);
  //   const input = getByRole('searchInput');
  //   const searchBtn = getByRole('searchBtn');

  //   // Fill the input with a value and click the submit button
  //   fireEvent.change(input, { target: { value: 'Star Wars' } });
  //   fireEvent.click(searchBtn);

  //   // Check if searchMovie function was called once with the correct query value
  //   expect(searchMovie).toHaveBeenCalledTimes(1);
  //   expect(searchMovie).toHaveBeenCalledWith(expect.objectContaining({
  //     preventDefault: expect.any(Function)
  //   }));

  //   // You can also check the URL after the form submission
  //   await waitFor(() => {
  //     expect(window.location.href).toContain('/results?query=Star%20Wars');
  //   });
  // });

});