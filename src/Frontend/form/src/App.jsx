import React from 'react'
import ApplyLeave from './Pages/ApplyLeave'
import { Route, Routes } from 'react-router-dom'
import NewOfficerRegistrationForm from './Pages/NewOfficerRegistrationForm.jsx'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<ApplyLeave />} />
      <Route path='/registerofficer' element={<NewOfficerRegistrationForm />} />
    </Routes>
  )
}

export default App