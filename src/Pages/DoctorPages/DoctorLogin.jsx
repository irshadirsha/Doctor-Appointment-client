import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const baseURL = import.meta.env.VITE_BACKEND_URL; 

  const navigate = useNavigate();

  useEffect(() => {
    const doctorAccessToken = localStorage.getItem('doctorAccessToken');
    if (doctorAccessToken) {
      navigate('/doctor-dashboard'); 
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/doctor/doctor-login`, { email, password });
      const { doctoraccessToken, doctorrefreshToken, doctor } = response.data;
      console.log("Response:", response); 

      if (response.data.status) {
        localStorage.setItem('doctorAccessToken', doctoraccessToken);
        localStorage.setItem('doctorRefreshToken', doctorrefreshToken);
        localStorage.setItem('doctor', JSON.stringify(doctor));
  
        navigate('/doctor-dashboard');
        toast.success('Login successful');
      }  else {
        toast.error('Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error('Login failed. Please check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Doctor Login</p>
        <p>Please log in to access your dashboard</p>

        <div className='w-full'>
          <p>Doctor Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        <div className='w-full'>
          <p>Doctor Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        <button type='submit' className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          Doctor Login
        </button>
      </div>
    </form>
  );
};

export default DoctorLogin;
