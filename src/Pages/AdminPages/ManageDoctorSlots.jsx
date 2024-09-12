import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

const ManageDoctorSlots = () => {
  const { doctorId } = useParams(); // Fetch doctor ID from URL
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [timeSlots, setTimeSlots] = useState([]);
  const baseURL = import.meta.env.VITE_BACKEND_URL;

  // Generate time options in 12-hour AM/PM format
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

  // Handle adding/removing slots
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

  // Function to submit the time slots for the doctor
  const submitTimeSlots = async () => {
    if (!startDate || !endDate || timeSlots.length === 0) {
      toast.error('Please fill in all fields and select at least one time slot');
      return;
    }

    try {
        console.log("sloats", startDate,endDate, timeSlots)
      const response = await axios.post(`${baseURL}/api/admin/add-slots/${doctorId}`, {
        startDate,
        endDate,
        slots: timeSlots,
      });
 console.log("response-----", response)
 console.log("response0000-----", response.data.success)
      if (response.data.success) {

        // make all things emply unmark the slot selection
        setStartDate(''); // Reset start date to empty string
        setEndDate(''); // Reset end date to empty string
        setTimeSlots([]); // Reset time slots to an empty array, unselecting all time slots
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

      {/* Date range selection */}
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

      {/* Time slots management with checkbox */}
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

      {/* Submit Button */}
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



// import React, { useState } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useParams } from 'react-router-dom'; // Get doctor ID from route params

// const ManageDoctorSlots = () => {
//   const { doctorId } = useParams(); // Fetch doctor ID from URL
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [timeSlots, setTimeSlots] = useState([]);
//   const baseURL = import.meta.env.VITE_BACKEND_URL;

//   // Function to handle adding a new time slot between 7 AM - 7 AM
//   const addTimeSlot = () => {
//     if (timeSlots.length >= 24) {
//       toast.error('You cannot add more than 24 slots (7 AM to 7 AM)');
//       return;
//     }

//     setTimeSlots(prevSlots => [
//       ...prevSlots,
//       { time: `${7 + prevSlots.length}:00 AM`, isBooked: false }
//     ]);
//   };

//   // Function to submit the time slots for the doctor
//   const submitTimeSlots = async () => {
//     if (!startDate || !endDate || timeSlots.length === 0) {
//       toast.error('Please fill in all fields and add at least one time slot');
//       return;
//     }

//     try {
//       const response = await axios.post(`${baseURL}/api/admin/doctor/${doctorId}/add-slots`, {
//         startDate,
//         endDate,
//         slots: timeSlots,
//       });

//       if (response.data.success) {
//         toast.success('Slots added successfully');
//       } else {
//         toast.error(response.data.message);
//       }
//     } catch (error) {
//       console.error('Error submitting time slots:', error);
//       toast.error('Failed to submit slots');
//     }
//   };

//   return (
//     <div className='m-5'>
//       <h1 className='text-lg font-medium'>Manage Time Slots for Doctor</h1>

//       {/* Date range selection */}
//       <div className='my-4'>
//         <label className='block text-sm'>Start Date</label>
//         <input
//           type='date'
//           value={startDate}
//           onChange={(e) => setStartDate(e.target.value)}
//           className='border p-2 rounded'
//         />
//       </div>

//       <div className='my-4'>
//         <label className='block text-sm'>End Date</label>
//         <input
//           type='date'
//           value={endDate}
//           onChange={(e) => setEndDate(e.target.value)}
//           className='border p-2 rounded'
//         />
//       </div>

//       {/* Time slots management */}
//       <div className='my-4'>
//         <button
//           className='bg-blue-500 text-white p-2 rounded'
//           onClick={addTimeSlot}
//         >
//           Add Time Slot
//         </button>

//         <div className='mt-4'>
//           {timeSlots.length > 0 && (
//             <ul>
//               {timeSlots.map((slot, index) => (
//                 <li key={index} className='border-b p-2'>
//                   {slot.time} {slot.isBooked ? '(Booked)' : '(Available)'}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       {/* Submit Button */}
//       <button
//         className='bg-green-500 text-white p-2 rounded'
//         onClick={submitTimeSlots}
//       >
//         Submit Time Slots
//       </button>
//     </div>
//   );
// }

// export default ManageDoctorSlots;
