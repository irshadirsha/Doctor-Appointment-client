import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

const Otp = () => {
  const [otp, setOtp] = useState('')
  
  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle OTP submission logic here
    console.log('OTP submitted:', otp)
  }

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>OTP Verification</p>
        <p>Please enter the OTP sent to your registered email.</p>
        <div className='w-full '>
          <p>OTP</p>
          <input 
            onChange={(e) => setOtp(e.target.value)} 
            value={otp} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="text" 
            required 
            maxLength="6" // Assuming OTP is 6 digits
          />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Verify OTP</button>
        <NavLink to='/login' >Back to login <span className='text-primary underline cursor-pointer'>Click here</span></NavLink>
      </div>
    </form>
  )
}

export default Otp
