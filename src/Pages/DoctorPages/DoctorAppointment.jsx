import React, { useState } from 'react'
import { assets } from '../../assets/assets'

const DoctorAppointments = () => {

  // Static mock data for appointments
  const [appointments] = useState([
    {
      _id: '1',
      userData: {
        name: 'John Doe',
        image: 'https://via.placeholder.com/150',
        dob: '1990-05-15'
      },
      payment: true,
      slotDate: '2024-09-10T14:30:00',
      slotTime: '2:30 PM',
      amount: 100,
      cancelled: false,
      isCompleted: false
    },
    {
      _id: '2',
      userData: {
        name: 'Jane Smith',
        image: 'https://via.placeholder.com/150',
        dob: '1985-08-21'
      },
      payment: false,
      slotDate: '2024-09-12T09:00:00',
      slotTime: '9:00 AM',
      amount: 150,
      cancelled: true,
      isCompleted: false
    },
    {
      _id: '3',
      userData: {
        name: 'Alex Johnson',
        image: 'https://via.placeholder.com/150',
        dob: '2000-01-05'
      },
      payment: true,
      slotDate: '2024-09-14T11:00:00',
      slotTime: '11:00 AM',
      amount: 120,
      cancelled: false,
      isCompleted: true
    }
  ])

  // Static functions to demonstrate cancel and complete actions
  const cancelAppointment = (id) => {
    console.log(`Cancel appointment with ID: ${id}`)
  }

  const completeAppointment = (id) => {
    console.log(`Complete appointment with ID: ${id}`)
  }

  // Helper functions for formatting dates and calculating age
  const slotDateFormat = (date) => new Date(date).toLocaleDateString()
  const calculateAge = (dob) => {
    const birthDate = new Date(dob)
    const ageDifMs = Date.now() - birthDate.getTime()
    const ageDate = new Date(ageDifMs)
    return Math.abs(ageDate.getUTCFullYear() - 1970)
  }
  const currency = '$' // Static currency

  return (
    <div className='w-full max-w-6xl m-5'>

      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className='flex items-center gap-2'>
              <img src={item.userData.image} className='w-8 rounded-full' alt="" /> <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                </div>
            }
          </div>
        ))}
      </div>

    </div>
  )
}

export default DoctorAppointments
