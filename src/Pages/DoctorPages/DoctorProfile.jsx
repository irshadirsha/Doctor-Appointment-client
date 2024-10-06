import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import doctorAxiosInstance from '../../Api/DoctorConfig';

const DoctorProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_BACKEND_URL; 
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      const doctorAccessToken = localStorage.getItem('doctorAccessToken');
      const doctorData = localStorage.getItem('doctor');
      const doctor = JSON.parse(doctorData);
      if (!doctorAccessToken || !doctor) {
        navigate('/doctor-login');
        return;
      }

      const doctorId = doctor.id;
      // console.log("doctorAccessToken:", doctorAccessToken);
      console.log("Doctor ID----------:", doctorId);

      try {
      
        const response = await doctorAxiosInstance.get(`${baseURL}/api/doctor/doctor-profile/${doctorId}`,)
        
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
          <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{profileData.name}</p>
          <div className='flex items-center gap-2 mt-1 text-gray-600'>
            <p>{profileData.degree} - {profileData.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{profileData.experience}</button>
          </div>

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


