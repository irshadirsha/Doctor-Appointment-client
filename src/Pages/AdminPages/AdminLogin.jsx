import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const baseURL = import.meta.env.VITE_BACKEND_URL; 
  const navigate = useNavigate();

  useEffect(() => {
    const adminaccessToken = localStorage.getItem('adminaccessToken');
    if (adminaccessToken) {
      navigate('/admin-dashboard'); 
    }
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseURL}/api/admin/admin-login`, {
        email,
        password
      });

      console.log("Admin Login response:", response.data);
      // localStorage.setItem('adminaccessToken', response.data.adminaccessToken);
      // localStorage.setItem('adminrefreshToken', response.data.adminrefreshToken);
      localStorage.setItem('adminaccessToken', response.data.adminaccessToken);
      localStorage.setItem('adminrefreshToken', response.data.adminrefreshToken);

      localStorage.setItem('admin', JSON.stringify(response.data.user));   
  
      navigate('/admin-dashboard');
    } catch (error) {
      console.error("Admin Login failed:", error.response?.data?.message || error.message);
      setError(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold'>Admin Login</p>
        <p>Please log in to manage the system</p>

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

        <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
          Admin Login
        </button>

        {error && <p className="text-red-500">{error}</p>}
      </div>
    </form>
  );
};

export default AdminLogin;





// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const baseURL = import.meta.env.VITE_BACKEND_URL; 
//   const navigate = useNavigate();

//   // If admin is already logged in, redirect to the dashboard
//   useEffect(() => {
//     const adminaccessToken = localStorage.getItem('adminaccessToken');
//     if (adminaccessToken) {
//       navigate('/admin-dashboard'); 
//     }
//   }, [navigate]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // Sending login request
//       const response = await axios.post(`${baseURL}/api/admin/admin-login`, {
//         email,
//         password
//       });

//       console.log("Admin Login response:", response.data);

//       // Storing access token, refresh token, and user details in localStorage
//       localStorage.setItem('adminaccessToken', response.data.accessToken);  // Short-lived access token
//       localStorage.setItem('adminrefreshToken', response.data.refreshToken); // Long-lived refresh token
//       localStorage.setItem('admin', JSON.stringify(response.data.user));  // Admin user details

//       // Navigate to the admin dashboard after successful login
//       navigate('/admin-dashboard');
//     } catch (error) {
//       console.error("Admin Login failed:", error.response?.data?.message || error.message);
//       setError(error.response?.data?.message || 'Login failed');
//     }
//   };

//   return (
//     <form className='min-h-[80vh] flex items-center' onSubmit={handleSubmit}>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//         <p className='text-2xl font-semibold'>Admin Login</p>
//         <p>Please log in to manage the system</p>

//         <div className='w-full'>
//           <p>Admin Email</p>
//           <input
//             onChange={(e) => setEmail(e.target.value)}
//             value={email}
//             className='border border-[#DADADA] rounded w-full p-2 mt-1'
//             type='email'
//             required
//           />
//         </div>

//         <div className='w-full'>
//           <p>Admin Password</p>
//           <input
//             onChange={(e) => setPassword(e.target.value)}
//             value={password}
//             className='border border-[#DADADA] rounded w-full p-2 mt-1'
//             type='password'
//             required
//           />
//         </div>

//         <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>
//           Admin Login
//         </button>

//         {error && <p className="text-red-500">{error}</p>}
//       </div>
//     </form>
//   );
// };

// export default AdminLogin;