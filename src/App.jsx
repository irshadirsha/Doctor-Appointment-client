import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/Register';
import Home from './Pages/Home';
import AllDoctors from './Pages/AllDoctors';
import About from './Pages/About';
import Contact from './Pages/Contact';
import MyAppointments from './Pages/MyAppointments';
import Otp from './components/Otp';
import AdminLayout from './Layout/AdminLayout';
import UserLayout from './Layout/UserLayout';
import DoctorLayout from './Layout/DoctorLayout';
import Login from './components/login';
import AdminDashbord from './Pages/AdminPages/AdminDashbord';
import AddDoctors from './Pages/AdminPages/AddDoctors';
import AllApointment from './Pages/AdminPages/AllApointment';
import AdminLogin from './Pages/AdminPages/AdminLogin';
import DoctorsList from './Pages/AdminPages/DoctorList';
import DoctorDashboard from './Pages/DoctorPages/DoctorDashboard';
import DoctorAppointments from './Pages/DoctorPages/DoctorAppointment';
import DoctorProfile from './Pages/DoctorPages/DoctorProfile';
import DoctorLogin from './Pages/DoctorPages/DoctorLogin';
import Appointment from './Pages/Appointment';
import ManageDoctorSlots from './Pages/AdminPages/ManageDoctorSlots';

function App() {
  return (
    <BrowserRouter>
      <MainRoutes />
    </BrowserRouter>
  );
}

function MainRoutes() {
  return (
    <Routes>
        <Route path='/admin-login' element={<AdminLogin/>}/>
      {/* Admin Routes */}
      <Route element={<AdminLayout />}>   
        <Route path='/admin-dashboard' element={<AdminDashbord />} />
        <Route path='/admin-addDoctors' element={<AddDoctors />} />
        <Route path='/admin-allappointments' element={<AllApointment />} />
        <Route path='/admin-doctorslist' element={<DoctorsList />} />
        <Route path='/admin-ManageSlots/:doctorId' element={<ManageDoctorSlots />} />
      </Route>

      {/* User Routes */}
      <Route element={<UserLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/otpverify' element={<Otp />} />
        <Route path='/doctors' element={<AllDoctors />} />
        <Route path='/about' element={<About />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/appointment/:id' element={<Appointment />} />
        <Route path='/my-appointment' element={<MyAppointments />} />
      </Route>
      {/* Doctor routes */}
      <Route path='/doctor-login' element={<DoctorLogin/>}/>
      <Route element={<DoctorLayout/>}>
      <Route path='/doctor-dashboard' element={<DoctorDashboard/>} />
        <Route path='/doctor-appointment' element={<DoctorAppointments/>} />
        <Route path='/doctor-profile' element={<DoctorProfile/>} />
      </Route>
    </Routes>
  );
}

export default App;




// import React from 'react'
// import './App.css'
// import {BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
// import Register from './components/Register'
// import Login from './components/login'
// import Home from './Pages/Home'
// import NavBar from './components/NavBar'
// import Footer from './components/Footer'
// import AllDoctors from './Pages/AllDoctors'
// import About from './Pages/About'
// import Contact from './Pages/Contact'
// import Appointment from './Pages/Appointment'
// import MyAppointments from './Pages/MyAppointments'
// import Otp from './components/Otp'
// import NavBarAdmin from './components/AdminComponents/NavBarAdmin'
// import SideBar from './components/AdminComponents/SideBar'
// import AdminLayout from './AdminLayout'
// import UserLayout from './UserLayout'


// function App() {   
 

//   const location = useLocation();
//   // const isAuthPage = location.pathname === '/login' || location.pathname === '/register';
//   const isAdminRoute = location.pathname.startsWith('/admin') // Check if the route is for admin
//   return (
//     <>
//     <div className='mx-4 sm:mx-[10%]'>
//      <BrowserRouter>
//     <NavBar/>
//     <NavBarAdmin/>
//      <Routes>
//       <Route path='/' element={<Home/>}/>
//       <Route path='/register' element={<Register/>}/>
//       <Route path='/login' element={<Login/>}/>
//       <Route path='/otpverify' element={<Otp/>}/>
//       <Route path='/doctors' element={<AllDoctors/>}/>
//       <Route path='/about' element={<About/>}/>
//       <Route path='/contact' element={<Contact/>}/>
//       <Route path='/appointment' element={<Appointment/>} />
//       <Route path='/my-appointment' element={<MyAppointments/>} />


//       <Route path='/admin' element={<NavBarAdmin/>}/>
//       <Route path='/admin-sidebar' element={<SideBar/>}/>

      
//      </Routes>
//      <Footer/>
//      </BrowserRouter>
//      </div>

//      <div>
//      <BrowserRouter>
//     <NavBarAdmin/>
//      <Routes>
//       <Route path='/admin' element={<NavBarAdmin/>}/>
//       <Route path='/admin-sidebar' element={<SideBar/>}/>
//      </Routes>
//      </BrowserRouter>
//      </div>
//     </>
//   )
// }

// export default App
