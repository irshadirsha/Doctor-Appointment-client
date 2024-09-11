import React from 'react'
import { assets } from '../../assets/assets'

function AllApointment() {
  // Static data for appointments
  const appointments = [
    {
      userData: {
        name: 'John Doe',
        image: 'https://via.placeholder.com/150',
        dob: '1985-05-15',
      },
      slotDate: '2024-09-10',
      slotTime: '10:30 AM',
      docData: {
        name: 'Dr. Emily Davis',
        image: 'https://via.placeholder.com/150',
      },
      amount: '100',
      cancelled: false,
      isCompleted: true
    },
    {
      userData: {
        name: 'Jane Smith',
        image: 'https://via.placeholder.com/150',
        dob: '1990-08-22',
      },
      slotDate: '2024-09-11',
      slotTime: '12:00 PM',
      docData: {
        name: 'Dr. John Wilson',
        image: 'https://via.placeholder.com/150',
      },
      amount: '150',
      cancelled: true,
      isCompleted: false
    },
    {
      userData: {
        name: 'Michael Johnson',
        image: 'https://via.placeholder.com/150',
        dob: '1978-02-10',
      },
      slotDate: '2024-09-09',
      slotTime: '09:00 AM',
      docData: {
        name: 'Dr. Anna Lee',
        image: 'https://via.placeholder.com/150',
      },
      amount: '200',
      cancelled: false,
      isCompleted: false
    }
  ]

  // Static functions for date format, age, and currency
  const slotDateFormat = (date) => new Date(date).toLocaleDateString()
  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const ageDiffMs = Date.now() - birthDate.getTime()
    const ageDate = new Date(ageDiffMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
  const currency = '$'

  return (
    <div className='w-full max-w-6xl m-5 '>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <div className='flex items-center gap-2'>
              <img src={item.docData.image} className='w-8 rounded-full bg-gray-200' alt="" /> <p>{item.docData.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {item.cancelled ? <p className='text-red-400 text-xs font-medium'>Cancelled</p> : item.isCompleted ? <p className='text-green-500 text-xs font-medium'>Completed</p> : <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />}
          </div>
        ))}
      </div>

    </div>
  )
}

export default AllApointment

