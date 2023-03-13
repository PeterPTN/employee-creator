import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import GlobalStyles from './styles/GlobalStyles'
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {index: true, element: <h2>Index element</h2>},
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GlobalStyles />
    <RouterProvider router={router} />
  </React.StrictMode>,
)
