import React from 'react'
// import { assets } from '../assets/assets'
import { assets } from '../../assets/assets'

function DoctorNavBar() {
  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Doctor Logo" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Doctor</p>
      </div>
      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
    </div>
  )
}

export default DoctorNavBar
