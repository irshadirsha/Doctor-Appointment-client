import React, { useState, useEffect } from 'react';
import { assets } from '../../assets/assets';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  const fetchAppointments = async () => {
    try {
      const token = localStorage.getItem('doctorToken');
      const doctor = JSON.parse(localStorage.getItem('doctor'));

      if (!token || !doctor) {
          navigate('/doctor-login');
        toast.error('Authentication failed. Please log in again.');
        return;
      }

      const doctorId = doctor.id; 

      const response = await axios.get(
        `${baseURL}/api/doctor/doctor-appointments/${doctorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setAppointments(response.data.appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      toast.error('Failed to fetch appointments. Please try again.');
    }
  };

  useEffect(() => {
   
    fetchAppointments();
  }, []);

  const slotDateFormat = (dateString) => {
    const dateObj = new Date(dateString);
    return dateObj.toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const currency = '₹'; 

    const cancelAppointment = async (appointmentId) => {
      console.log(`Cancel appointment with ID: ${appointmentId}`);
      try {
        const doctor = JSON.parse(localStorage.getItem('doctor'));
        const token = localStorage.getItem('doctorToken');
        const doctorId = doctor.id; 
        console.log("Token:", token);
        console.log("Doctor ID----------:", doctorId);
        if (!doctor || !token) {
          toast.error('Authentication failed. Please log in again.');
          return;
        }
    
        const response = await axios.put(
          `${baseURL}/api/doctor/cancel-appoint/${doctorId}/${appointmentId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("res",response)
    
        toast.success(response.data.message);
        fetchAppointments();
      } catch (error) {
        console.error('Error cancelling appointment:', error);
        toast.error('Failed to cancel appointment.');
      }
    };

    const completeAppointment = async (appointmentId) => {
      console.log(`Complete appointment with ID: ${appointmentId}`);
      try {
        const doctor = JSON.parse(localStorage.getItem('doctor'));
        const token = localStorage.getItem('doctorToken');
        const doctorId = doctor.id; 
        console.log("Token:", token);
        console.log("Doctor ID----------:", doctorId);
        if (!doctor || !token) {
          toast.error('Authentication failed. Please log in again.');
          return;
        }
    
        const response = await axios.put(
          `${baseURL}/api/doctor/complete-appoint/${doctor.id}/${appointmentId}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
    
        toast.success(response.data.message);
        fetchAppointments();
      } catch (error) {
        console.error('Error completing appointment:', error);
        toast.error('Failed to complete appointment.');
      }
    };
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50' key={index}>
            <p className='max-sm:hidden'>{index + 1}</p>
            <div className=''>
              <p>{item.userData.name}</p>
            </div>
            <div>
              <p className='text-xs inline border border-primary px-2 rounded-full'>
                {item.payment ? 'Online' : 'CASH'}
              </p>
            </div>
            <p className='text-md w-16'>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
            <p className=''>{currency}{item.amount}</p>
            {item.cancelled
              ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
              : item.isCompleted
                ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                : <div className='flex'>
                  <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="Cancel" />
                  <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="Complete" />
                </div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorAppointments;


