import React from 'react'
import NavBar from '../components/NavBar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
    <div className='mx-4 sm:mx-[10%]'>
      <NavBar/>
      <Outlet/>
      <Footer/>
    </div>
  )
}

export default UserLayout


