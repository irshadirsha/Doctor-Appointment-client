import React from 'react'
import DoctorNavBar from '../components/DoctorComponents/DoctorNavBar'
import DoctorSideBar from '../components/DoctorComponents/DoctorSideBar'
import { Outlet } from 'react-router-dom'

const DoctorLayout = () => {
  return (
    <div>
      <DoctorNavBar/>
      <div className='flex'>
        <DoctorSideBar/>
        <div className='flex-grow'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default DoctorLayout
