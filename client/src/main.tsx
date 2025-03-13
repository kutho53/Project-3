import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App.jsx'
import Error from './pages/Error'
import ClientList from './pages/clientList'
import ClientDetail from './pages/clientDetail'
import Login from './pages/login'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: 'user/:userId',
        element: <ClientList />,
        children: [
          
        ]
      },
      {
        path: 'user/:userId/client/:clientId',
        element: <ClientDetail />,
      },
    ],
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
