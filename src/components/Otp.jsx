import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const Otp = () => {
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('OTP and email submitted:', otp, email);

    try {
      const response = await axios.post(`${baseURL}/api/user/verify-otp`, {
        email,
        otp
      });

      console.log("Response from OTP verification:", response.data);

      if(response.data.status) {
        console.log("OTP verified successfully, navigating to login page");
        navigate('/login'); 
      } else {
        console.log("OTP verification failed:", response.data.message);
      }
    } catch (error) {
      console.error("Error verifying OTP:", error.response?.data?.message || error.message);
    }
  }

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>OTP Verification</p>
        <p>Please enter the OTP sent to your registered email.</p>

        <div className='w-full'>
          <p>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="email" 
            required 
            placeholder="Enter your email"
          />
        </div>

        <div className='w-full'>
          <p>OTP</p>
          <input 
            onChange={(e) => setOtp(e.target.value)} 
            value={otp} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="text" 
            required 
            maxLength="6" 
            placeholder="Enter the 6-digit OTP"
          />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          Verify OTP
        </button>

        <NavLink to='/login'>
          Back to login <span className='text-primary underline cursor-pointer'>Click here</span>
        </NavLink>
      </div>
    </form>
  )
}

export default Otp;

