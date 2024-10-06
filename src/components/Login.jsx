import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axiosInstance from '../Api/config';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const baseURL = import.meta.env.VITE_BACKEND_URL; 
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    console.log("inside useeffect  accessToken, user",accessToken,user)
    
    if (accessToken && user) {
      navigate('/'); 
    }
  },[navigate, email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
     
      const response = await axiosInstance.post(`${baseURL}/api/user/login`, {
        email,
        password
      });

      console.log("Login response:", response.data);
      localStorage.setItem('accessToken', response.data.accessToken);  // Store access token
      localStorage.setItem('refreshToken', response.data.refreshToken); // Store refresh token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user info
      localStorage.setItem('accessToken', response.data.accessToken);
      console.log("Access token stored:", localStorage.getItem('accessToken'));  // Debug token storing
      window.dispatchEvent(new Event('storage'));
      navigate('/');
    } catch (error) {
      console.error("Login failed:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed');
    }
  }

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Login</p>
        <p>Please log in to book an appointment</p>
        <div className='w-full '>
          <p>Email</p>
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="email" 
            required 
          />
        </div>
        <div className='w-full '>
          <p>Password</p>
          <input 
            onChange={(e) => setPassword(e.target.value)} 
            value={password} 
            className='border border-[#DADADA] rounded w-full p-2 mt-1' 
            type="password" 
            required 
          />
        </div>
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Login</button>
      
        {error && <p className="text-red-500">{error}</p>}
        
        <NavLink to='/register'>Create a new account? <span className='text-primary underline cursor-pointer'>Click here</span></NavLink>
      </div>
    </form>
  )
}

export default Login;



