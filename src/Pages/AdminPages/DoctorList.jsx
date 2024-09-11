import React from 'react'

const DoctorsList = () => {

  // Static data for doctors
  const doctors = [
    {
      name: 'Dr. John Doe',
      speciality: 'Cardiologist',
      image: 'https://via.placeholder.com/150',
      available: true
    },
    {
      name: 'Dr. Jane Smith',
      speciality: 'Neurologist',
      image: 'https://via.placeholder.com/150',
      available: false
    },
    {
      name: 'Dr. Emily Davis',
      speciality: 'Pediatrician',
      image: 'https://via.placeholder.com/150',
      available: true
    }
  ]

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div className='border border-[#C9D8FF] rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
            <img className='bg-[#EAEFFF] group-hover:bg-primary transition-all duration-500' src={item.image} alt={item.name} />
            <div className='p-4'>
              <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
              <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input type="checkbox" checked={item.available} readOnly />
                <p>Available</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DoctorsList
