import React, { useState } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const baseURL = import.meta.env.VITE_BACKEND_URL; // Ensure your backend URL is set in the env file
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Making the API call to backend /login route
      const response = await axios.post(`${baseURL}/api/user/login`, {
        email,
        password
      });

      console.log("Login response:", response.data);

      // Store the token in localStorage
      localStorage.setItem('token', response.data.token); // Store the JWT token
      localStorage.setItem('user', JSON.stringify(response.data.user)); // Store user details

      // Navigate to the home or dashboard page upon successful login
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
        
        {/* Display error message if login fails */}
        {error && <p className="text-red-500">{error}</p>}
        
        <NavLink to='/register'>Create a new account? <span className='text-primary underline cursor-pointer'>Click here</span></NavLink>
      </div>
    </form>
  )
}

export default Login;




// import React, { useState } from 'react'
// import { NavLink } from 'react-router-dom'
// import NavBar from './NavBar'

// const Login = () => {

//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')

//   return (
    
//     <form className='min-h-[80vh] flex items-center'>
//       <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//         <p className='text-2xl font-semibold'>Login</p>
//         <p>Please log in to book appointment</p>
//         <div className='w-full '>
//           <p>Email</p>
//           <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
//         </div>
//         <div className='w-full '>
//           <p>Password</p>
//           <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
//         </div>
//         <button className='bg-primary text-white w-full py-2 my-2 rounded-md text-base'>Login</button>
//         <NavLink to='/register' >Create a new account? <span className='text-primary underline cursor-pointer'>Click here</span></NavLink>
//       </div>
//     </form>
//   )
// }

// export default Login

