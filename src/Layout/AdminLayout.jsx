import React from 'react'
import NavBarAdmin from '../components/AdminComponents/NavBarAdmin'
import SideBar from '../components/AdminComponents/SideBar'
import { Outlet } from 'react-router-dom'
const AdminLayout = () => {
  return (
    <div>
      <NavBarAdmin/>
      <div className='flex'>
        <SideBar/>
        <div className='flex-grow'>
          <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
