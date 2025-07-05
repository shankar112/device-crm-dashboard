import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import App from '../App'
import Dashboard from '../pages/Dashboard'

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/app" element={<App />} />
      </Routes>
    </Router>
  )
}

export default AppRoutes
