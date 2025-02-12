import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css';
import App from './App';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import Login from './pages/Login';
import NewPages from './pages/NewPages';
import FoodFacts from './pages/foodFacts'; // Import FoodFacts page
import SavedDishes from './pages/savedDishes'; // Import SavedDishes page

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
        path: '/food-facts', // Define the route for Food Facts page
        element: <FoodFacts />,
      },
      {
        path: '/saved-dishes', // Define the route for Saved Dishes page
        element: <SavedDishes />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
