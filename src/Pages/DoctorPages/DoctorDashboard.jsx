import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import doctorAxiosInstance from '../../Api/DoctorConfig';

function DoctorDashboard() {
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState({
    earnings: 0,
    appointments: 0,
    patients: 0,
    latestAppointments: []
  });

  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const slotDateFormat = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const currency = '₹'; 
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem('doctorToken');
        const doctor = JSON.parse(localStorage.getItem('doctor'));

        if (!token || !doctor) {
          navigate('/doctor-login');
          toast.error('Authentication failed. Please log in again.');
          return;
        }
       

        const doctorId = doctor.id;

        const response = await doctorAxiosInstance.get(`${baseURL}/api/doctor/doctor-dashboard/${doctorId}`);

        setDashboardData(response.data);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        toast.error('Failed to fetch dashboard data. Please try again.');
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <div className='m-5'>
      <div className='flex flex-wrap gap-3'>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.earning_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{currency} {dashboardData.earnings}</p>
            <p className='text-gray-400'>Earnings</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.appointments_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.appointments}</p>
            <p className='text-gray-400'>Appointments</p>
          </div>
        </div>
        <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transition-all'>
          <img className='w-14' src={assets.patients_icon} alt="" />
          <div>
            <p className='text-xl font-semibold text-gray-600'>{dashboardData.patients}</p>
            <p className='text-gray-400'>Patients</p>
          </div>
        </div>
      </div>

      <div className='bg-white'>
        <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
          <img src={assets.list_icon} alt="" />
          <p className='font-semibold'>Latest Bookings</p>
        </div>

        <div className='pt-4 border border-t-0'>
          {dashboardData.latestAppointments.length > 0 ? (
            dashboardData.latestAppointments.map((item, index) => (
              <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                <img className='rounded-full w-10' src={item.userData.image || assets.default_user_image} alt="" />
                <div className='flex-1 text-sm'>
                  <p className='text-gray-800 font-medium'>{item.userData.name}</p>
                  <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
                </div>
                {item.cancelled
                  ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                  : item.isCompleted
                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                    : null
                }
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500">No recent bookings found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorDashboard;

