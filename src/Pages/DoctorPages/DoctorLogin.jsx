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
    const token = localStorage.getItem('doctorToken');
    if (token) {
      navigate('/doctor-dashboard'); 
    }
  }, [navigate]);

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/doctor/doctor-login`, { email, password });

      // Destructure the response data
      const { token, doctor } = response.data;
      console.log("Response:", response); // Log entire response
      console.log("Token:", token); // Log the token
      console.log("Doctor Data:", doctor); // Log the doctor data

      // Check if login was successful
      if (response.data.status) {
        // Store token and doctor data in localStorage
        localStorage.setItem('doctorToken', token); // Store token
        localStorage.setItem('doctor', JSON.stringify(doctor)); // Store doctor data
        
        navigate('/doctor-dashboard'); // Redirect to dashboard
        toast.success('Login successful');
      } else {
        // Handle case where status is not true
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

// import React, { useState } from 'react';

// const DoctorLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   return (
//     <form className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//         {/* Updated the heading for Doctor Login */}
//         <p className='text-2xl font-semibold'>Doctor Login</p>
//         <p>Please log in to access your dashboard</p>

//         {/* Doctor Email Field */}
//         <div className='w-full '>
//           <p>Doctor Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className='border border-[#DADADA] rounded w-full p-2 mt-1'
//             type='email'
//             required
//           />
//         </div>

//         {/* Doctor Password Field */}
//         <div className='w-full '>
//           <p>Doctor Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className='border border-[#DADADA] rounded w-full p-2 mt-1'
//             type='password'
//             required
//           />
//         </div>

//         {/* Doctor Login Button */}
//         <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
//           Doctor Login
//         </button>
//       </div>
//     </form>
//   );
// };

// export default DoctorLogin;
