import React from 'react'
import ApplyLeave from './Pages/ApplyLeave'
import { Route, Routes } from 'react-router-dom'
import NewOfficerRegistrationForm from './Pages/NewOfficerRegistrationForm.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/dashboard.jsx'
import Admin from './Pages/admin.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import PublicRoute from './PublicRoute.jsx'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<PublicRoute><Login /></PublicRoute>} />
      <Route path='/registerofficer' element={<ProtectedRoute><NewOfficerRegistrationForm /></ProtectedRoute>} />
      <Route path='/applyleave' element={<ProtectedRoute><ApplyLeave /></ProtectedRoute>} />
      <Route path='/dashboard' element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path='/admin' element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    </Routes>
  )
}

export default App