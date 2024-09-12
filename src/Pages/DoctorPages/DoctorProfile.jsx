import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      // Retrieve the token and doctor data from localStorage
      const token = localStorage.getItem('doctorToken');
      const doctorData = localStorage.getItem('doctor'); // Get doctor data from localStorage
      const doctor = JSON.parse(doctorData); // Parse the doctor data to get the object
    //   localStorage.removeItem(doctorToken)
    //   localStorage.removeItem(doctor)
      if (!token || !doctor) {
        // If token or doctor data is missing, redirect to login
        navigate('/doctor-login');
        return;
      }

      const doctorId = doctor.id; // Access the doctor ID from the parsed object
      console.log("Token:", token);
      console.log("Doctor ID:", doctorId);

      try {
        // Fetch doctor profile data using the retrieved doctor ID and token
        const response = await axios.get(`${baseURL}/api/doctor/doctor-profile/${doctorId}`, {
          headers: { Authorization: `Bearer ${token}` } // Pass the token in the headers
        });
        
        // Set the profile data from the response
        setProfileData(response.data.doctor);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching doctor profile:', error);
        toast.error('Error fetching profile data');
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [navigate, baseURL]);

  if (loading) return <p>Loading...</p>;

  return profileData ? (
    <div>
      <div className='flex flex-col gap-4 m-5'>
        <div>
          <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="Doctor Profile" />
        </div>

        <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

          {/* ----- Doctor Info : name, degree, experience ----- */}
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

          {/* ----- Doctor About ----- */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
            <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
              {profileData.about}
            </p>
          </div>

          <p className='text-gray-600 font-medium mt-4'>
            Appointment fee: <span className='text-gray-800'>{profileData.fees}</span>
          </p>

          <div className='flex gap-2 py-2'>
            <p>Address:</p>
            <p className='text-sm'>
              {profileData.address.line1}
              <br />
              {profileData.address.line2}
            </p>
          </div>

          <div className='flex gap-1 pt-2'>
            <input type="checkbox" checked={profileData.available} readOnly />
            <label htmlFor="">Available</label>
          </div>

        </div>
      </div>
    </div>
  ) : (
    <p>No profile data available</p>
  );
};

export default DoctorProfile;




// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import { useNavigate } from 'react-router-dom';

// const DoctorProfile = () => {
//   const [profileData, setProfileData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const baseURL = import.meta.env.VITE_BACKEND_URL; 
//   const navigate = useNavigate();

//   // Fetch doctor profile data from backend
//   useEffect(() => {
//     const fetchProfileData = async () => {
//       const token = localStorage.getItem('doctorToken');
//       const doctorId = localStorage.getItem('doctorId'); // Assume the doctor ID is stored in localStorage
//      console.log("token",token);
//      console.log(doctorId);
     
//       if (!token || !doctorId) {
//         // navigate('/doctor-login'); 
//         return;
//       }

//       try {
//         const response = await axios.get(`${baseURL}/api/doctor/doctor-profile/${doctorId}`, {
//           headers: { Authorization: `Bearer ${token}` }
//         });
//         setProfileData(response.data.doctor);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching doctor profile:', error);
//         toast.error('Error fetching profile data');
//         setLoading(false);
//       }
//     };

//     fetchProfileData();
//   }, [navigate, baseURL]);

//   if (loading) return <p>Loading...</p>;

//   return profileData && (
//     <div>
//       <div className='flex flex-col gap-4 m-5'>
//         <div>
//           <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="Doctor Profile" />
//         </div>

//         <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

//           {/* ----- Doctor Info : name, degree, experience ----- */}
//           <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//           <div className='flex items-center gap-2 mt-1 text-gray-600'>
//             <p>{profileData.degree} - {profileData.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//           </div>

//           {/* ----- Doctor About ----- */}
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
//             <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//               {profileData.about}
//             </p>
//           </div>

//           <p className='text-gray-600 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-800'>{profileData.fees}</span>
//           </p>

//           <div className='flex gap-2 py-2'>
//             <p>Address:</p>
//             <p className='text-sm'>
//               {profileData.address.line1}
//               <br />
//               {profileData.address.line2}
//             </p>
//           </div>

//           <div className='flex gap-1 pt-2'>
//             <input type="checkbox" checked={profileData.available} readOnly />
//             <label htmlFor="">Available</label>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorProfile;



// import React, { useState } from 'react'
// import { toast } from 'react-toastify'

// const DoctorProfile = () => {

//     // Static mock data for the profile
//     const [profileData, setProfileData] = useState({
//         image: 'https://via.placeholder.com/150',
//         name: "Dr. Sarah Lee",
//         degree: "MBBS",
//         speciality: "Cardiologist",
//         experience: "10 years",
//         about: "Dr. Sarah Lee is a renowned cardiologist with over 10 years of experience. She specializes in treating heart diseases and ensuring her patients lead a healthy lifestyle.",
//         fees: 150,
//         address: {
//             line1: "123 Health Avenue",
//             line2: "City, State, Zip"
//         },
//         available: true
//     })

//     const currency = "$" // Static currency
//     const [isEdit, setIsEdit] = useState(false)

//     // Static updateProfile function (just for demonstration purposes)
//     const updateProfile = () => {
//         toast.success('Profile updated successfully!')
//         setIsEdit(false)
//     }

//     return profileData && (
//         <div>
//             <div className='flex flex-col gap-4 m-5'>
//                 <div>
//                     <img className='bg-primary/80 w-full sm:max-w-64 rounded-lg' src={profileData.image} alt="" />
//                 </div>

//                 <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>

//                     {/* ----- Doctor Info : name, degree, experience ----- */}
//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{profileData.degree} - {profileData.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
//                     </div>

//                     {/* ----- Doctor About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About :</p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//                             {
//                                 isEdit
//                                     ? <textarea onChange={(e) => setProfileData(prev => ({ ...prev, about: e.target.value }))} type='text' className='w-full outline-primary p-2' rows={8} value={profileData.about} />
//                                     : profileData.about
//                             }
//                         </p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>
//                         Appointment fee: <span className='text-gray-800'>{currency} {isEdit ? <input type='number' onChange={(e) => setProfileData(prev => ({ ...prev, fees: e.target.value }))} value={profileData.fees} /> : profileData.fees}</span>
//                     </p>

//                     <div className='flex gap-2 py-2'>
//                         <p>Address:</p>
//                         <p className='text-sm'>
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))} value={profileData.address.line1} /> : profileData.address.line1}
//                             <br />
//                             {isEdit ? <input type='text' onChange={(e) => setProfileData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))} value={profileData.address.line2} /> : profileData.address.line2}
//                         </p>
//                     </div>

//                     <div className='flex gap-1 pt-2'>
//                         <input type="checkbox" onChange={() => isEdit && setProfileData(prev => ({ ...prev, available: !prev.available }))} checked={profileData.available} />
//                         <label htmlFor="">Available</label>
//                     </div>

//                     {
//                         isEdit
//                             ? <button onClick={updateProfile} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Save</button>
//                             : <button onClick={() => setIsEdit(prev => !prev)} className='px-4 py-1 border border-primary text-sm rounded-full mt-5 hover:bg-primary hover:text-white transition-all'>Edit</button>
//                     }

//                 </div>
//             </div>
//         </div>
//     )
// }

// export default DoctorProfile
