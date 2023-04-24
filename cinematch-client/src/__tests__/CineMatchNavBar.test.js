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

});
