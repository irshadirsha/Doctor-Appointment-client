import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; 

const DoctorsList = () => {
  const [doctors, setDoctors] = useState([]); 
  const baseURL = import.meta.env.VITE_BACKEND_URL; 
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const token = localStorage.getItem('token');
          if (!token) {
            navigate('/admin-login'); 
          }
        const response = await axios.get(`${baseURL}/api/admin/get-doctors`,{
          headers: {
                 Authorization: `Bearer ${token}` 
              }
        });

        if (response.data.status) {
          setDoctors(response.data.doctors); 
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.error('Error fetching doctors:', error);
        toast.error('Failed to load doctors');
      }
    };

    fetchDoctors();
  }, []); 

  const handleDoctorClick = (doctorId) => {
    navigate(`/admin-ManageSlots/${doctorId}`);
  };

  const handleDeleteDoctor = async (doctorId) => {
    console.log("remove id ",doctorId )
    const confirmDelete = window.confirm("Are you sure you want to delete this doctor?");
    if (!confirmDelete) return; 
    try {
      const token = localStorage.getItem('token');
      const response = await axios.delete(`${baseURL}/api/admin/remove-doctor/${doctorId}`,{
        headers: {
          Authorization: `Bearer ${token}` 
       }
      });
      console.log("responsse", response)
      if (response.data.success) {

        toast.success('Doctor deleted successfully');

        setDoctors(doctors.filter((doctor) => doctor._id !== doctorId));
      } else {
        toast.error(response.data.message || 'Failed to delete doctor');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
      toast.error('Failed to delete doctor');
    }
  };

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div 
              className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group'
              key={index}
            >
              <img 
                className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' title='click here to add time slot' 
                src={item.image || 'https://via.placeholder.com/150'} 
                alt={item.name} 
                onClick={() => handleDoctorClick(item._id)} 
              />
              <div className='p-4'>
                <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
                <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
                <div className='mt-2 flex items-center gap-1 text-sm'>
                  <input type="checkbox" checked={item.available} readOnly />
                  <p>Available</p>
                </div>
                <button 
                  className='mt-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition'
                  onClick={() => handleDeleteDoctor(item._id)} 
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No doctors available</p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;

