import React from 'react';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function DoctorNavBar() {
  const navigate = useNavigate(); // Initialize the useNavigate hook for redirection

  // Function to handle logout
  const handleLogout = () => {
    // Remove doctor-related items from localStorage
    localStorage.removeItem('doctorToken');
    localStorage.removeItem('doctor');

    // Optionally, you can clear everything from localStorage if required:
    // localStorage.clear();

    // Navigate to doctor login page after clearing localStorage
    navigate('/doctor-login');
  };

  return (
    <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Doctor Logo" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Doctor</p>
      </div>
      {/* Attach the handleLogout function to the Logout button */}
      <button className='bg-primary text-white text-sm px-10 py-2 rounded-full' onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default DoctorNavBar;




// import React from 'react'
// // import { assets } from '../assets/assets'
// import { assets } from '../../assets/assets'

// function DoctorNavBar() {
//   return (
//     <div className='flex justify-between items-center px-4 sm:px-10 py-3 border-b bg-white'>
//       <div className='flex items-center gap-2 text-xs'>
//         <img className='w-36 sm:w-40 cursor-pointer' src={assets.admin_logo} alt="Doctor Logo" />
//         <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600'>Doctor</p>
//       </div>
//       <button className='bg-primary text-white text-sm px-10 py-2 rounded-full'>Logout</button>
//     </div>
//   )
// }

// export default DoctorNavBar
