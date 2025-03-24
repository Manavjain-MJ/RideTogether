import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { Navbar } from './components/layouts/Navbar'
import { Route, Routes } from 'react-router-dom'
import { RidePosting } from './components/driver/RidePosting'
import { HeroPage } from './components/user/HeroPage'
import { VehicleDetails } from './components/driver/VehicleDetails'
import { Login } from '@mui/icons-material'
import { RideLogin } from './components/common/RideLogin'
import { RideSignup } from './components/common/RideSignup'
import { RideListing } from './components/user/RideListing'
import axios from 'axios'
import PrivateRoute from './PrivateRoutes'
import PrivateRoutes from './PrivateRoutes'
// import './App.css'

function App() {
  axios.defaults.baseURL = "http://localhost:8000"
  return (
    <>
      <Routes>
        <Route path='/login' element={<RideLogin />} />
        <Route path='/signup' element={<RideSignup />} />


          <Route path='/' element={<HeroPage />} />
        <Route path="" element={<PrivateRoutes />}>
          <Route path='/rideposting' element={<RidePosting />} />
          <Route path='/vehicledetails' element={<VehicleDetails />} />
          <Route path='/ridelisting' element={<RideListing />} />
        </Route>
      </Routes>
      {/* <Navbar/> */}
    </>
  )
}

export default App
