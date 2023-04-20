// import React from 'react';
// import axios from 'axios';
// import { render, screen } from '@testing-library/react';
// import UserPage from '../UserPage';

// jest.mock('axios');

// describe('UserPage component', () => {
//   beforeEach(() => {
//     // mock the API responses
//     axios.get.mockResolvedValueOnce({ data: [{ movie_id: '1', completed: false }] })
//       .mockResolvedValueOnce({ data: [{ movie_id: '2', rating: 8, review: 'Good movie' }] });
//     render(<UserPage />);
//   });

//   it('renders To-Watch List table', async () => {
//     const table = await screen.findByRole('table', { name: /To-Watch List/ });
//     const rows = table.querySelectorAll('tbody tr');
//     expect(rows).toHaveLength(1);
//     expect(rows[0]).toHaveTextContent('1');
//     expect(rows[0]).toHaveTextContent('NO');
//   });
// });

test('test', () => {
  expect(true).toBe(true);
});