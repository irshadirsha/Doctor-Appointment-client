import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import {  useNavigate, useParams } from 'react-router-dom';

const ManageDoctorSlots = () => {
  const { doctorId } = useParams(); 
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate()

  const generateTimeOptions = () => {
    const times = [];
    for (let hour = 7; hour <= 18; hour++) {
      const amPm = hour < 12 ? 'AM' : 'PM';
      const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
      times.push(`${formattedHour}:00 ${amPm}`);
    }
    return times;
  };

  const timeOptions = generateTimeOptions();

  const toggleSlotSelection = (time) => {
    setTimeSlots((prevSlots) => {
      const exists = prevSlots.find((slot) => slot.time === time);
      if (exists) {
        return prevSlots.filter((slot) => slot.time !== time);
      } else {
        return [...prevSlots, { time, isBooked: false }];
      }
    });
  };

  const submitTimeSlots = async () => {
    if (!startDate || !endDate || timeSlots.length === 0) {
      toast.error('Please fill in all fields and select at least one time slot');
      return;
    }

    try {
      console.log("slots", startDate, endDate, timeSlots);
      const response = await axios.post(`${baseURL}/api/admin/add-slots/${doctorId}`, {
        startDate,
        endDate,
        slots: timeSlots,
      });
      
      console.log("response", response);
      const slotsBooked = response.data.doctor.slots_booked;
for (let date in slotsBooked) {
  console.log(`Date: ${date}`);
  for (let time in slotsBooked[date]) {
    console.log(`Time: ${time}, Is Booked: ${slotsBooked[date][time].isBooked}`);
  }
}

      if (response.data.success) {
        setStartDate('');
        setEndDate('');
        setTimeSlots([]);
        navigate('/admin-doctorslist')
        toast.success('Slots added successfully');
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error submitting time slots:', error);
      toast.error('Failed to submit slots');
    }
  };

  return (
    <div className='m-5'>
      <h1 className='text-lg font-medium'>Manage Time Slots for Doctor</h1>
      <div className='my-4'>
        <label className='block text-sm'>Start Date</label>
        <input
          type='date'
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className='border p-2 rounded'
        />
      </div>

      <div className='my-4'>
        <label className='block text-sm'>End Date</label>
        <input
          type='date'
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className='border p-2 rounded'
        />
      </div>
      <div className='my-4'>
        <h2 className='text-sm font-medium mb-2'>Select Time Slots (7 AM - 7 PM)</h2>
        <div className='grid grid-cols-3 gap-4'>
          {timeOptions.map((time, index) => (
            <label key={index} className='flex items-center'>
              <input
                type='checkbox'
                className='mr-2'
                onChange={() => toggleSlotSelection(time)}
                checked={timeSlots.some((slot) => slot.time === time)}
              />
              {time}
            </label>
          ))}
        </div>
      </div>
      <button
        className='bg-green-500 text-white p-2 rounded mt-4'
        onClick={submitTimeSlots}
      >
        Submit Time Slots
      </button>
    </div>
  );
};

export default ManageDoctorSlots;

