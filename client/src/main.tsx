//the main.tsx file is the entry point for the React application
// this allows the app.tsx file to be the main component of the app
// it renders the app to the root element in the index.html file


// We must add the new paths if we want them to render on to the page. 

import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';

import App from './App.tsx';

import ErrorPage from './pages/ErrorPage.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import NewPages from './pages/NewPages.tsx';

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
      // Creates a new path for the NewPages component
      {
        path: '/new',
        element: <NewPages />,
      },

    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
