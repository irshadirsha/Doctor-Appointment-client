import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

function AllAppointment() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin-login'); 
    }
  }, []); 
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const token = localStorage.getItem('token');
  
        const response = await axios.get(`${baseUrl}/api/admin/get-appointment`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });

        console.log('Response in All Appointment:', response);
        if (response.data.success) {
          setAppointments(response.data.appointments);
        } else {
          toast.error(response.data.message || 'Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
        toast.error('Error fetching appointments');
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  const calculateAge = (dob) => {
    if (!dob) return '-';
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age;
  };

  const slotDateFormat = (slotDate) => {
    const date = new Date(slotDate);
    return date.toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const currency = '₹'; 
  if (loading) {
    return <p>Loading...</p>; 
  }

  return (
    <div className="w-full max-w-6xl m-5">
      <p className="mb-3 text-lg font-medium">All Appointments</p>

      <div className="bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll">
        <div className="hidden sm:grid grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
          <p>#</p>
          <p>Patient</p>
          <p>Services</p>
          <p>Date & Time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {appointments.map((item, index) => (
          <div
            className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_2fr_1fr_2fr_2fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
            key={index}
          >
            <p className="max-sm:hidden">{index + 1}</p>
            <div className="flex items-center gap-2">
              <p>{item.userId?.name || '-'}</p>
            </div>

            <p className="max-sm:hidden">{item.docId?.speciality || '-'}</p>

            <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>

            <div className="flex items-center gap-2">
              <img
                src={item.docId?.image || 'https://via.placeholder.com/150'}
                className="w-8 rounded-full bg-gray-200"
                alt={item.docId?.name}
              />
              <p>{item.docId?.name || '-'}</p>
            </div>

            {/* Fees */}
            <p>{currency}{item.amount || '-'}</p>
            {item.cancelled ? (
              <p className="text-red-400 text-xs font-medium">Cancelled</p>
            ) : item.isCompleted ? (
              <p className="text-green-500 text-xs font-medium">Completed</p>
            ) : (
              <img
                className="w-10 cursor-pointer"
                src={assets.cancel_icon}
                alt="Cancel"
                onClick={() => toast.info('Cancel button clicked')}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default AllAppointment;

