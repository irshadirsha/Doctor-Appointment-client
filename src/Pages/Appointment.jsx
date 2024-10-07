import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { assets } from '../assets/assets'; 
import axiosInstance from '../Api/config';

const Appointment = () => {
    const { id } = useParams(); 
    const navigate = useNavigate();
    const [docInfo, setDocInfo] = useState(null); 
    const [docSlots, setDocSlots] = useState([]); 
    const [displayedSlots, setDisplayedSlots] = useState([]); 
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState(''); 
    const [page, setPage] = useState(0); 
    const slotsPerPage = 7; 
    const baseURL = import.meta.env.VITE_BACKEND_URL;

    // useEffect(() => {
    //     const fetchDoctorData = async () => {
    //         try {
    //             const response = await axiosInstance.get(`${baseURL}/api/appoint/book-appointment/${id}`);
    //             console.log("response",response)
    //             setDocInfo(response.data.doctor);
    //             setDocSlots(response.data.slots);
    //             setDisplayedSlots(response.data.slots.slice(0, slotsPerPage)); 
    //         } catch (error) {
    //             console.error('Error fetching doctor data:', error);
    //         }
    //     };

    //     fetchDoctorData();
    // }, [id, baseURL]);

    useEffect(() => {
        const fetchDoctorData = async () => {
            try {
                const response = await axiosInstance.get(`${baseURL}/api/appoint/book-appointment/${id}`);
                console.log("response", response);
                setDocInfo(response.data.doctor);
    
                // Get current date without time (midnight of today)
                const today = new Date();
                today.setHours(0, 0, 0, 0); // set to midnight for accurate comparison
    
                // Filter out slots that are before today
                const futureSlots = response.data.slots.filter(slot => {
                    const slotDate = new Date(slot.date);
                    return slotDate >= today; // only include slots for today or future
                });
    
                setDocSlots(futureSlots); // Set only future slots
                setDisplayedSlots(futureSlots.slice(0, slotsPerPage)); // Show only filtered slots in pagination
            } catch (error) {
                console.error('Error fetching doctor data:', error);
            }
        };
    
        fetchDoctorData();
    }, [id, baseURL]);
    

    const bookAppointment = async () => {
        if (!slotTime) {
            alert('Please select a time slot');
            return;
        }

        try {

            // const token = localStorage.getItem('token');
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user ? user.id : null; 
           console.log("from local",user, userId)
            if (!userId) {
                alert('User not authenticated. Please log in.');
                navigate('/login');
                return;
            }

            console.log("appoint ment function called")
            
            const response = await axiosInstance.post(
                `${baseURL}/api/appoint/book-appointment`, 
                {
                    docId: id, 
                    slotDate: docSlots[slotIndex].date, 
                    slotTime, 
                    userId 
                });
            if (response.data.success) {
                alert('Appointment booked successfully!');
                navigate('/my-appointment');
                // navigate(`/my-appointment?userId=${userId}`);
            } else {
                alert('Failed to book appointment: ' + response.data.message);
            }
        } catch (error) {
            console.error('Error booking appointment:', error);
            alert('Error booking appointment. Please try again.');
        }
    };

    // Load next slots
    const loadMoreSlots = () => {
        const nextPage = page + 1;
        const startIndex = nextPage * slotsPerPage;
        const nextSlots = docSlots.slice(startIndex, startIndex + slotsPerPage);
        setDisplayedSlots(nextSlots);
        setPage(nextPage);
    };

    const loadPreviousSlots = () => {
        if (page > 0) {
            const prevPage = page - 1;
            const startIndex = prevPage * slotsPerPage;
            const prevSlots = docSlots.slice(startIndex, startIndex + slotsPerPage);
            setDisplayedSlots(prevSlots);
            setPage(prevPage);
        }
    };

    return docInfo ? (
        <div>
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt={docInfo.name} />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience} years</button>
                    </div>

                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>${docInfo.fees}</span> </p>
                </div>
            </div>

            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-6 items-center w-full overflow-x-scroll mt-4'>
                    {displayedSlots.length && displayedSlots.map((slot, index) => (
                        <div
                        onClick={() => setSlotIndex(index)}
                        key={index}
                        className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}
                        >
                        <p>{new Date(slot.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
                        </div>
                    ))}
                    </div>

              <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                 {/* Check if slots are available */}
                    {docSlots.length && docSlots[slotIndex].slots.filter(item => !item.isBooked).length > 0 ? (
                        docSlots[slotIndex].slots
                            .filter(item => !item.isBooked) 
                            .map((item, index) => (
                                <p
                                    onClick={() => setSlotTime(item.time)}
                                    key={index}
                                    className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
                                >
                                    {item.time}
                                </p>
                            ))
                    ) : (
                       
                        <p className="text-red-500 font-medium">Sorry, Please Select other Doctor</p>
                    )}
                    {/* {docSlots.length && docSlots[slotIndex].slots
                        .filter(item => !item.isBooked) // Only show slots  isBooked  false
                        .map((item, index) => (
                            <p
                                onClick={() => setSlotTime(item.time)}
                                key={index}
                                className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
                            >
                                {item.time}
                            </p>
                        ))} */}
                </div>
            </div>

            <div className='flex justify-between mt-4'>
                {page > 0 && <button onClick={loadPreviousSlots} className='bg-gray-200 text-black font-medium py-2 px-4 rounded-lg'>Previous</button>}
                {docSlots.length > (page + 1) * slotsPerPage && <button onClick={loadMoreSlots} className='bg-gray-200 text-black font-medium py-2 px-4 rounded-lg'>Next</button>}
            </div>

            <div className='flex justify-end'>
                <button onClick={bookAppointment} className='bg-primary text-white font-medium py-2.5 px-6 rounded-lg mt-6'>Confirm Booking</button>
            </div>
        </div>
    ) : (
        <p className='text-center'>Loading...</p>
    );
};

export default Appointment;

