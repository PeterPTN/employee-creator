import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router';
import { Provider } from 'react-redux';
import { store } from './store';
import EmployeePage from './pages/EmployeePage';
import CreateEmployeePage from './pages/CreateEmployeePage';
import ReactDOM from 'react-dom/client'
import React from 'react'
import App from './App'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <CreateEmployeePage /> },
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
  </React.StrictMode>,
)
