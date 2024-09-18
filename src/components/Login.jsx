import React, { useEffect, useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const baseURL = import.meta.env.VITE_BACKEND_URL; 
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    
    
    if (token && user) {
      navigate('/'); 
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
     
      const response = await axios.post(`${baseURL}/api/user/login`, {
        email,
        password
      });

      console.log("Login response:", response.data);
      localStorage.setItem('token', response.data.token); 
      localStorage.setItem('user', JSON.stringify(response.data.user)); 
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



