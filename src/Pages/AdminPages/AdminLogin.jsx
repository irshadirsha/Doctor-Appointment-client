import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        {/* Updated the heading for Admin Login */}
        <p className='text-2xl font-semibold'>Admin Login</p>
        <p>Please log in to manage the system</p>

        {/* Admin Email Field */}
        <div className='w-full '>
          <p>Admin Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        {/* Admin Password Field */}
        <div className='w-full '>
          <p>Admin Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        {/* Admin Login Button */}
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          Admin Login
        </button>
      </div>
    </form>
  );
};

export default AdminLogin;


