import React from 'react'
import ApplyLeave from './Pages/ApplyLeave'
import { Route, Routes } from 'react-router-dom'
import NewOfficerRegistrationForm from './Pages/NewOfficerRegistrationForm.jsx'
import Login from './Pages/Login.jsx'
import Dashboard from './Pages/dashboard.jsx'
import Admin from './Pages/admin.jsx'



const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/registerofficer' element={<NewOfficerRegistrationForm />} />
      <Route path='/applyleave' element={<ApplyLeave />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/admin' element={<Admin />} />
    </Routes>
  )
}

export default App