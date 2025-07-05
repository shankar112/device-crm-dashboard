// main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import './scss/global.scss'
import { Provider } from 'react-redux'
import { store } from './store'
import AppRoutes from './routes/AppRoutes'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </React.StrictMode>
)
