import React from 'react'
import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Register from './components/Register'
import Login from './components/login'
import Home from './Pages/Home'
import NavBar from './components/NavBar'
import Footer from './components/Footer'
import AllDoctors from './Pages/AllDoctors'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Appointment from './Pages/Appointment'
import MyAppointments from './Pages/MyAppointments'
import Otp from './components/Otp'

function App() {
 

  // const location = useLocation();
  // const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  return (
    <>
    <div className='mx-4 sm:mx-[10%]'>
     <BrowserRouter>
    <NavBar/>
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/otpverify' element={<Otp/>}/>
      <Route path='/doctors' element={<AllDoctors/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/appointment' element={<Appointment/>} />
      <Route path='/my-appointment' element={<MyAppointments/>} />
     </Routes>
     {/* {!isAuthPage && <Footer />} */}
     <Footer/>
     </BrowserRouter>
     </div>
    </>
  )
}

export default App
