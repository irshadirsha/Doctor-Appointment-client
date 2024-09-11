import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
// import RelatedDoctors from '../components/RelatedDoctors'

const Appointment = () => {
    const navigate = useNavigate()

    // Static doctor information
    const docInfo = {
        image: 'doctor.jpg',
        name: 'Dr. Jane Doe',
        degree: 'MD',
        speciality: 'Gynecologist',
        experience: '10 years',
        about: 'Dr. Jane Doe has been practicing medicine for over a decade with a specialization in gynecology. She is known for her compassionate care and expertise in women’s health.',
        fees: 50,
        slots_booked: {
            '10_9_2024': ['10:00 AM'] // Example slot booking
        }
    }

    // Static available slots
    const docSlots = [
        [
            { datetime: new Date(), time: '10:00 AM' },
            { datetime: new Date(new Date().setHours(10, 30)), time: '10:30 AM' },
            { datetime: new Date(new Date().setHours(11, 0)), time: '11:00 AM' }
        ],
        [
            { datetime: new Date(new Date().setDate(new Date().getDate() + 1)), time: '11:00 AM' },
        ],
        // Add more static slots here
    ]

    const [slotIndex, setSlotIndex] = React.useState(0)
    const [slotTime, setSlotTime] = React.useState('')

    const bookAppointment = () => {
        alert('Appointment booked successfully!')
        navigate('/my-appointments')
    }

    return docInfo ? (
        <div>

            {/* ---------- Doctor Details ----------- */}
            <div className='flex flex-col sm:flex-row gap-4'>
                <div>
                    <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
                </div>

                <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

                    {/* ----- Doc Info : name, degree, experience ----- */}
                    <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
                    <div className='flex items-center gap-2 mt-1 text-gray-600'>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
                    </div>

                    {/* ----- Doc About ----- */}
                    <div>
                        <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
                        <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
                    </div>

                    <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>${docInfo.fees}</span> </p>
                </div>
            </div>

            {/* Booking slots */}
            <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
                <p>Booking slots</p>
                <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots.map((item, index) => (
                        <div onClick={() => setSlotIndex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}>
                            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                            <p>{item[0] && item[0].datetime.getDate()}</p>
                        </div>
                    ))}
                </div>

                <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
                    {docSlots.length && docSlots[slotIndex].map((item, index) => (
                        <p onClick={() => setSlotTime(item.time)} key={index} className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}>
                            {item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
            </div>

            {/* Listing Related Doctors */}
            {/* <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} /> */}
        </div>
    ) : null
}

export default Appointment


// import React, { useState, useEffect } from 'react'
// import { useParams, useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'

// const Appointment = () => {
//     const { docId } = useParams()
//     const navigate = useNavigate()

//     // State for doctor info and slots
//     const [docInfo, setDocInfo] = useState(null)
//     const [docSlots, setDocSlots] = useState([])
//     const [slotIndex, setSlotIndex] = useState(0)
//     const [slotTime, setSlotTime] = useState('')

//     useEffect(() => {
//         // Fetch doctor info and slots based on docId
//         // Replace with your API call
//         const fetchDoctorInfo = async () => {
//             // Simulating an API call
//             const response = await fetch(`/api/doctors/${docId}`)
//             const data = await response.json()
//             setDocInfo(data.doctor)
//             setDocSlots(data.slots)
//         }
//         fetchDoctorInfo()
//     }, [docId])

//     const bookAppointment = () => {
//         // Static booking functionality
//         alert('Appointment booked successfully!')
//         navigate('/my-appointments')
//     }

//     if (!docInfo) return <p>Loading...</p>

//     return (
//         <div>
//             {/* ---------- Doctor Details ----------- */}
//             <div className='flex flex-col sm:flex-row gap-4'>
//                 <div>
//                     <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//                 </div>

//                 <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//                     {/* ----- Doc Info : name, degree, experience ----- */}
//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" /></p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{docInfo.degree} - {docInfo.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//                     </div>

//                     {/* ----- Doc About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="" /></p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{docInfo.fees}</span> </p>
//                 </div>
//             </div>

//             {/* Booking slots */}
//             <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
//                 <p>Booking slots</p>
//                 <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//                     {docSlots.length && docSlots.map((item, index) => (
//                         <div 
//                             onClick={() => setSlotIndex(index)} 
//                             key={index} 
//                             className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}
//                         >
//                             <p>{item[0] && item[0].datetime.toLocaleDateString('en-US', { weekday: 'short' })}</p>
//                             <p>{item[0] && item[0].datetime.getDate()}</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//                     {docSlots.length && docSlots[slotIndex].map((item, index) => (
//                         <p 
//                             onClick={() => setSlotTime(item.time)} 
//                             key={index} 
//                             className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
//                         >
//                             {item.time.toLowerCase()}
//                         </p>
//                     ))}
//                 </div>

//                 <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
//             </div>

//             {/* Listing Related Doctors */}
//             {/* <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} /> */}
//         </div>
//     )
// }

// export default Appointment



// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { assets } from '../assets/assets'
// // import RelatedDoctors from '../components/RelatedDoctors'

// const Appointment = () => {

//     const navigate = useNavigate()

//     // Static doctor information
//     const docInfo = {
//         image: 'doctor.jpg',
//         name: 'Dr. Jane Doe',
//         degree: 'MD',
//         speciality: 'Gynecologist',
//         experience: '10 years',
//         about: 'Dr. Jane Doe has been practicing medicine for over a decade with a specialization in gynecology. She is known for her compassionate care and expertise in women’s health.',
//         fees: 50,
//     }

//     // Static available slots
//     const docSlots = [
//         [
//             { datetime: new Date(), time: '10:00 AM' },
//             { datetime: new Date(new Date().setHours(10, 30)), time: '10:30 AM' },
//             { datetime: new Date(new Date().setHours(11, 0)), time: '11:00 AM' }
//         ],
//         [
//             { datetime: new Date(new Date().setDate(new Date().getDate() + 1)), time: '11:00 AM' },
//             { datetime: new Date(new Date().setDate(new Date().getDate() + 1).setHours(11, 30)), time: '11:30 AM' }
//         ],
//         // Add more static slots here
//     ]

//     // Static slot index and time
//     const slotIndex = 0
//     const slotTime = '10:00 AM'

//     const bookAppointment = () => {
//         // Static booking functionality
//         alert('Appointment booked successfully!')
//         navigate('/my-appointments')
//     }

//     return (
//         <div>

//             {/* ---------- Doctor Details ----------- */}
//             <div className='flex flex-col sm:flex-row gap-4'>
//                 <div>
//                     <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="Doctor" />
//                 </div>

//                 <div className='flex-1 border border-[#ADADAD] rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

//                     {/* ----- Doc Info : name, degree, experience ----- */}
//                     <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{docInfo.name} <img className='w-5' src={assets.verified_icon} alt="Verified Icon" /></p>
//                     <div className='flex items-center gap-2 mt-1 text-gray-600'>
//                         <p>{docInfo.degree} - {docInfo.speciality}</p>
//                         <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//                     </div>

//                     {/* ----- Doc About ----- */}
//                     <div>
//                         <p className='flex items-center gap-1 text-sm font-medium text-[#262626] mt-3'>About <img className='w-3' src={assets.info_icon} alt="Info Icon" /></p>
//                         <p className='text-sm text-gray-600 max-w-[700px] mt-1'>{docInfo.about}</p>
//                     </div>

//                     <p className='text-gray-600 font-medium mt-4'>Appointment fee: <span className='text-gray-800'>{docInfo.fees}</span> </p>
//                 </div>
//             </div>

//             {/* Booking slots */}
//             <div className='sm:ml-72 sm:pl-4 mt-8 font-medium text-[#565656]'>
//                 <p>Booking slots</p>
//                 <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//                     {docSlots.length && docSlots.map((item, index) => (
//                         <div 
//                             onClick={() => {/* handle slot index change */}} 
//                             key={index} 
//                             className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-primary text-white' : 'border border-[#DDDDDD]'}`}
//                         >
//                             <p>{item[0] && item[0].datetime.toLocaleDateString('en-US', { weekday: 'short' })}</p>
//                             <p>{item[0] && item[0].datetime.getDate()}</p>
//                         </div>
//                     ))}
//                 </div>

//                 <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//                     {docSlots.length && docSlots[slotIndex].map((item, index) => (
//                         <p 
//                             onClick={() => {/* handle slot time change */}} 
//                             key={index} 
//                             className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-primary text-white' : 'text-[#949494] border border-[#B4B4B4]'}`}
//                         >
//                             {item.time.toLowerCase()}
//                         </p>
//                     ))}
//                 </div>

//                 <button onClick={bookAppointment} className='bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6'>Book an appointment</button>
//             </div>

//             {/* Listing Related Doctors */}
//             {/* <RelatedDoctors speciality={docInfo.speciality} docId={docInfo._id} /> */}
//         </div>
//     )
// }

// export default Appointment
