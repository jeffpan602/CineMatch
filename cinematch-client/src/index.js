import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import UserPage from './UserPage';
import Stats from './Stats'
import ErrorPage from './Error-Page';

// ReactDOM.render(
//   <BrowserRouter>
//     <Routes>
//       <Route exact path="/" element={<App />} />
//       <Route exact path='/home' element={<App />} />
//       <Route path='/user' element={<UserPage />} />
//       <Route path='/stats' element={<Stats />} />
//     </Routes>

//   </BrowserRouter>,
//   document.getElementById('root')
// );

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/user',
    element: <UserPage />,
    errorElement: <ErrorPage />
  },
  {
    path: '/stats',
    element: <Stats />,
    errorElement: <ErrorPage />
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);