import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import Loader from '../components/Loader';
import axiosInstance from '../Api/config';

const MyAppointments = () => {
    const navigate = useNavigate(); 
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user ? user.id : null;
    const baseURL = import.meta.env.VITE_BACKEND_URL;
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false); 

    const fetchAppointments = async () => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`${baseURL}/api/appoint/booking-history/${userId.trim()}`);

            console.log("Response received:", response);

            if (response.data.success) {
                setAppointments(response.data.data);
            } else {
                alert('Failed to fetch appointments');
            }
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }finally {
            setLoading(false); 
        }
    };

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const user = localStorage.getItem('user');
        if (!accessToken || !user) {
            navigate('/login');
        } else if (userId) {
            fetchAppointments();
        }
    }, [userId, navigate]); 

    const cancelAppointment = async (appointmentId) => {
        try {
            setLoading(true);
            const response = await axiosInstance.get(`${baseURL}/api/appoint/cancel-appoint/${appointmentId}`);
            console.log("response in cancel", response);

            if (response.data.success) {
                fetchAppointments();
                alert('Appointment canceled successfully');
            } else {
                alert(response.data.message);
            }
        } catch (error) {
            console.error('Error canceling appointment:', error);
        }finally {
            setLoading(false); 
        }
    };

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            {loading ? (
                <Loader />
            ) : (
            <div className=''>
                {appointments.length > 0 ? (
                    appointments.map((item, index) => (
                        <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                            <div>
                                <img className='w-36 bg-[#EAEFFF]' src={item?.docId?.image} alt="Doctor" />
                            </div>
                            <div className='flex-1 text-sm text-[#5E5E5E]'>
                                <p className='text-[#262626] text-base font-semibold'>{item?.docId?.name}</p>
                                <p>{item?.docId?.speciality}</p>
                                <p className='text-[#464646] font-medium mt-1'>Address:</p>
                                <p>{item?.docId?.address?.line1}</p>
                                <p>{item?.docId?.address?.line2}</p>
                                <p className='mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {(item?.slotDate)} | {item?.slotTime}</p>
                            </div>
                            <div></div>
                            <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                               {!item.cancelled && (
                                 <a className='sm:min-w-48 py-2 border rounded text-[#696969] bg-[#EAEFFF]' href={`${baseURL}/api/appoint/download/${item._id}`}>
                                 Download Invoice
                             </a>
                               )}
                                {item.isCompleted && (
                                    <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>
                                        Completed
                                    </button>
                                )}
                                {(!item.cancelled && !item.isCompleted) && (
                                    <button
                                        className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'
                                        onClick={() => cancelAppointment(item._id)}
                                    >
                                        Cancel appointment
                                    </button>
                                )}

                                {item.cancelled && (
                                    <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>
                                        Appointment cancelled
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No appointments found</p>
                )}
            </div>
            )}
        </div>
    );
};

export default MyAppointments;

