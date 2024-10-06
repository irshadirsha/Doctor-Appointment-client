import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axiosInstance from '../Api/config';


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate(); 
  
  const baseURL= import.meta.env.VITE_BACKEND_URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("inside reg function",baseURL);
      console.log("inside reg function",name,email,password);
      
      const response = await axiosInstance.post(`${baseURL}/api/user/register`, {
        name,
        email,
        password,
      });

      if (response.status === 201) {
        // navigate('/otpverify');
        navigate('/otpverify', { state: { email } });
      }
    } catch (error) {

      setError(error.response?.data?.message || 'An error occurred during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Create Account</p>
        <p>Please sign up to book appointment</p>
        {error && <p className='text-red-500'>{error}</p>} 
        <div className='w-full'>
          <p>Full Name</p>
          <input onChange={(e) => setName(e.target.value)} value={name} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="text" required />
        </div>
        <div className='w-full'>
          <p>Email</p>
          <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Create account</button>
        <NavLink to='/login'>Already have an account? <span className='text-primary underline cursor-pointer'>Login here</span></NavLink>
      </div>
    </form>
  );
}

export default Register;

