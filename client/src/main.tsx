// The main.tsx file is the entry point for the React application
// This allows the App.tsx file to be the main component of the app
// It renders the app to the root element in the index.html file

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App.tsx';
import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import NewPages from './pages/NewPages.tsx';
import NearbyStore from './pages/NearbyStore.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/new',
        element: <NewPages />,
      },
      {
        path: '/nearby-store',
        element: <NearbyStore />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
