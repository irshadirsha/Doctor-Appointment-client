import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios for API call

const TopDoctors = () => {
  const [doctors, setDoctors] = useState([]); // State to hold the fetched doctor data
  const [loading, setLoading] = useState(true); // State to manage loading state
  const navigate = useNavigate();
  const baseURL = import.meta.env.VITE_BACKEND_URL; // Get backend URL from environment variables

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        // Fetch doctor data from the backend
        const response = await axios.get(`${baseURL}/api/admin/get-doctors`);
        console.log("response",response)
        // Set the doctors in the state, but limit it to the first 8
        setDoctors(response.data.doctors.slice(0, 8));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctors:', error);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, [baseURL]);

  if (loading) return <p>Loading...</p>;

  return (
    <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
      <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
      <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
      <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
        {/* Map over the doctors and render each doctor */}
        {doctors.map((item, index) => (
          <div 
            onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
            className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
            key={index}
          >
            <img className='bg-[#EAEFFF]' src={item.image} alt={item.name} />
            <div className='p-4'>
              <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
                <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
                <p>{item.available ? 'Available' : "Not Available"}</p>
              </div>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
      <button 
        onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
        // onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }}
        className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
      >
        more
      </button>
    </div>
  );
};

export default TopDoctors;




// import React from 'react'
// import { useNavigate } from 'react-router-dom'

// const TopDoctors = () => {

//     const navigate = useNavigate()

//     // Static data for doctors
//     const doctors = [
//         { _id: '1', image: 'doctor1.jpg', available: true, name: 'Dr. Alice Smith', speciality: 'Cardiologist' },
//         { _id: '2', image: 'doctor2.jpg', available: false, name: 'Dr. Bob Johnson', speciality: 'Neurologist' },
//         // Add more static doctors data here
//     ]

//     return (
//         <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
//             <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//             <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//                 {doctors.slice(0, 10).map((item, index) => (
//                     <div 
//                         onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} 
//                         className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' 
//                         key={index}
//                     >
//                         <img className='bg-[#EAEFFF]' src={item.image} alt="" />
//                         <div className='p-4'>
//                             <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
//                                 <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p>
//                                 <p>{item.available ? 'Available' : "Not Available"}</p>
//                             </div>
//                             <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//                             <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <button 
//                 onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} 
//                 className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'
//             >
//                 more
//             </button>
//         </div>
//     )
// }

// export default TopDoctors





// import React, { useContext } from 'react'
// import { useNavigate } from 'react-router-dom'
// // import { AppContext } from '../context/AppContext'
// const TopDoctors = () => {

//     const navigate = useNavigate()

//     // const { doctors } = useContext(AppContext)

//     return (
//         <div className='flex flex-col items-center gap-4 my-16 text-[#262626] md:mx-10'>
//             <h1 className='text-3xl font-medium'>Top Doctors to Book</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//             <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//                 {doctors.slice(0, 10).map((item, index) => (
//                     <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='bg-[#EAEFFF]' src={item.image} alt="" />
//                         <div className='p-4'>
//                             <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-gray-500"}`}>
//                                 <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-gray-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
//                             </div>
//                             <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//                             <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <button onClick={() => { navigate('/doctors'); scrollTo(0, 0) }} className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
//         </div>

//     )
// }

// export default TopDoctors