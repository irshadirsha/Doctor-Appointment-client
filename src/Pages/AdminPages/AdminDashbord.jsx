import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function AdminDashbord() {
  const baseURL=import.meta.env.VITE_BACKEND_URL
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    totalDoctors: 0,
    totalPatients: 0,
    totalAppointments: 0,
    latestBookings: [],
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('token');
          if (!token) {
            navigate('/admin-login'); 
          }
        const response = await axios.get(`${baseURL}/api/admin/dashboard-stats`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setDashboardData(response.data);
        console.log("respp", response);
        
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.doctor_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalDoctors}</p>
            <p className='text-gray-400'>Doctors</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalAppointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.totalPatients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>
{/* latest booking  */}
      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashboardData.latestBookings.length > 0 ? (
            dashboardData.latestBookings.map((booking, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={assets.doctor_icon} alt="Doctor" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>Dr. {booking?.docId?.name}</p>
                  <p className='text-gray-800 font-medium'> {booking?.docId?.speciality}</p>
                  <p className='text-gray-600'>Booking on {booking?.slotDate}</p>
                  <p className='text-gray-600'>Time {booking?.slotTime}</p>
                </div>
              </div>
            ))
          ) : (
            <p className='text-center text-gray-500 py-4'>No bookings available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashbord;





// import React from 'react'
// import { assets } from '../../assets/assets'
// function AdminDashbord() {

//   return (
//     <div className='m-5'>
//       <div className='flex flex-wrap gap-3'>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.doctor_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>10</p>
//             <p className='text-gray-400'>Doctors</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.appointments_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>20</p>
//             <p className='text-gray-400'>Appointments</p>
//           </div>
//         </div>
//         <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
//           <img className='w-14' src={assets.patients_icon} alt="" />
//           <div>
//             <p className='text-xl font-semibold text-gray-600'>30</p>
//             <p className='text-gray-400'>Patients</p>
//           </div>
//         </div>
//       </div>

//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//           <img src={assets.list_icon} alt="" />
//           <p className='font-semibold'>Latest Bookings</p>
//         </div>

//         <div className='pt-4 border border-t-0'>
//           {/** Static list of latest bookings */}
//           {[...Array(5)].map((_, index) => (
//             <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//               <img className='rounded-full w-10' src={assets.doctor_icon} alt="" />
//               <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>Dr. John Doe</p>
//                 <p className='text-gray-600'>Booking on 01 Jan 2024</p>
//               </div>
//               <img className='w-10 cursor-pointer' src={assets.cancel_icon} alt="cancel" />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default AdminDashbord
