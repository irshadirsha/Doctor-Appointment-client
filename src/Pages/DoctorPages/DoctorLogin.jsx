import React, { useState } from 'react';

const DoctorLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <form className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        {/* Updated the heading for Doctor Login */}
        <p className='text-2xl font-semibold'>Doctor Login</p>
        <p>Please log in to access your dashboard</p>

        {/* Doctor Email Field */}
        <div className='w-full '>
          <p>Doctor Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='email'
            required
          />
        </div>

        {/* Doctor Password Field */}
        <div className='w-full '>
          <p>Doctor Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type='password'
            required
          />
        </div>

        {/* Doctor Login Button */}
        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          Doctor Login
        </button>
      </div>
    </form>
  );
};

export default DoctorLogin;
