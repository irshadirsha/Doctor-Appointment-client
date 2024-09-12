import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Use navigate for routing

const DoctorsList = () => {
  // State to hold the list of doctors fetched from the backend
  const [doctors, setDoctors] = useState([]);
  
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate(); // Hook for navigation

  // Fetch doctors from the backend when the component mounts
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/admin/get-doctors`);
        if (response.data.status) {
          setDoctors(response.data.doctors); // Assuming the doctors data comes in response.data.doctors
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to load doctors');
      }
    };

    fetchDoctors();
  }, []); // Empty dependency array means this runs only once on component mount

  // Navigate to the slot management page for the selected doctor
  const handleDoctorClick = (doctorId) => {
    navigate(`/admin-ManageSlots/${doctorId}`);
    
  }

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div 
              className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
              key={index}
              onClick={() => handleDoctorClick(item._id)} // Navigate to manage slots page
            >
              <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
              <div className='p-4'>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input type="checkbox" checked={item.available} readOnly />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </div>
    </div>
  );
}

export default DoctorsList;



// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';

// const DoctorsList = () => {
//   // State to hold the list of doctors fetched from the backend
//   const [doctors, setDoctors] = useState([]);
  
//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   // Fetch doctors from the backend when the component mounts
//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await axios.get(`${baseURL}/api/admin/get-doctors`);
//         if (response.data.status) {
//           setDoctors(response.data.doctors); // Assuming the doctors data comes in response.data.doctors
//         } else {
//           toast.error(response.data.message);
//         }
//       } catch (error) {
//         console.error('Error fetching doctors:', error);
//         toast.error('Failed to load doctors');
//       }
//     };

//     fetchDoctors();
//   }, []); // Empty dependency array means this runs only once on component mount

//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {doctors.length > 0 ? (
//           doctors.map((item, index) => (
//             <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//               <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image || 'https://via.placeholder.com/150'} alt={item.name} />
//               <div className='p-4'>
//                 <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//                 <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//                 <div className='mt-2 flex items-center gap-1 text-sm'>
//                   <input type="checkbox" checked={item.available} readOnly />
//                   <p>Available</p>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>No doctors available</p>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DoctorsList;





// import React from 'react'

// const DoctorsList = () => {

//   // Static data for doctors
//   const doctors = [
//     {
//       name: 'Dr. John Doe',
//       speciality: 'Cardiologist',
//       image: 'https://via.placeholder.com/150',
//       available: true
//     },
//     {
//       name: 'Dr. Jane Smith',
//       speciality: 'Neurologist',
//       image: 'https://via.placeholder.com/150',
//       available: false
//     },
//     {
//       name: 'Dr. Emily Davis',
//       speciality: 'Pediatrician',
//       image: 'https://via.placeholder.com/150',
//       available: true
//     }
//   ]

//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {doctors.map((item, index) => (
//           <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//             <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt={item.name} />
//             <div className='p-4'>
//               <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//               <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//               <div className='mt-2 flex items-center gap-1 text-sm'>
//                 <input type="checkbox" checked={item.available} readOnly />
//                 <p>Available</p>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

// export default DoctorsList
