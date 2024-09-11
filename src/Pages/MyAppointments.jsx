// import React from 'react'
// import { assets } from '../assets/assets'

// const MyAppointments = () => {
//     // Hardcoded appointment data
//     const appointments = [
//         {
//             docData: {
//                 image: 'https://via.placeholder.com/150',
//                 name: 'Dr. John Doe',
//                 speciality: 'Cardiologist',
//                 address: {
//                     line1: '123 Main St',
//                     line2: 'Apt 4B',
//                 }
//             },
//             slotDate: '20_09_2024',
//             slotTime: '10:00 AM',
//             cancelled: false,
//             payment: false,
//             isCompleted: false,
//             _id: 'appointment1'
//         },
//         {
//             docData: {
//                 image: 'https://via.placeholder.com/150',
//                 name: 'Dr. Jane Smith',
//                 speciality: 'Neurologist',
//                 address: {
//                     line1: '456 Elm St',
//                     line2: 'Suite 2A',
//                 }
//             },
//             slotDate: '22_09_2024',
//             slotTime: '02:00 PM',
//             cancelled: true,
//             payment: true,
//             isCompleted: false,
//             _id: 'appointment2'
//         }
//     ]

//     const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

//     // Function to format the date
//     const slotDateFormat = (slotDate) => {
//         const dateArray = slotDate.split('_')
//         return dateArray[0] + " " + months[Number(dateArray[1]) - 1] + " " + dateArray[2]
//     }

//     return (
//         <div>
//             <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
//             <div className=''>
//                 {appointments.map((item, index) => (
//                     <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
//                         <div>
//                             <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="Doctor" />
//                         </div>
//                         <div className='flex-1 text-sm text-[#5E5E5E]'>
//                             <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
//                             <p>{item.docData.speciality}</p>
//                             <p className='text-[#464646] font-medium mt-1'>Address:</p>
//                             <p className=''>{item.docData.address.line1}</p>
//                             <p className=''>{item.docData.address.line2}</p>
//                             <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
//                         </div>
//                         <div></div>
//                         <div className='flex flex-col gap-2 justify-end text-sm text-center'>
//                             {!item.cancelled && !item.payment && !item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
//                             {!item.cancelled && !item.payment && !item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="Stripe Logo" /></button>}
//                             {!item.cancelled && !item.payment && item.isCompleted && <button className='bg-[#57B852] text-white text-sm font-light py-2 rounded-full'>Completed</button>}
//                             {item.cancelled && <button className='bg-[#F98D68] text-white text-sm font-light py-2 rounded-full'>Cancelled</button>}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default MyAppointments














import React from 'react'
import { assets } from '../assets/assets'

const MyAppointments = () => {

    // Hardcoded appointment data
    const appointments = [
        {
            docData: {
                image: 'https://via.placeholder.com/150',
                name: 'Dr. John Doe',
                speciality: 'Cardiologist',
                address: {
                    line1: '123 Main St',
                    line2: 'Apt 4B',
                }
            },
            slotDate: '20_09_2024',
            slotTime: '10:00 AM',
            cancelled: false,
            payment: false,
            isCompleted: false,
            _id: 'appointment1'
        },
        {
            docData: {
                image: 'https://via.placeholder.com/150',
                name: 'Dr. Jane Smith',
                speciality: 'Neurologist',
                address: {
                    line1: '456 Elm St',
                    line2: 'Suite 2A',
                }
            },
            slotDate: '22_09_2024',
            slotTime: '02:00 PM',
            cancelled: true,
            payment: true,
            isCompleted: false,
            _id: 'appointment2'
        }
    ]

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    return (
        <div>
            <p className='pb-3 mt-12 text-lg font-medium text-gray-600 border-b'>My appointments</p>
            <div className=''>
                {appointments.map((item, index) => (
                    <div key={index} className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-4 border-b'>
                        <div>
                            <img className='w-36 bg-[#EAEFFF]' src={item.docData.image} alt="Doctor" />
                        </div>
                        <div className='flex-1 text-sm text-[#5E5E5E]'>
                            <p className='text-[#262626] text-base font-semibold'>{item.docData.name}</p>
                            <p>{item.docData.speciality}</p>
                            <p className='text-[#464646] font-medium mt-1'>Address:</p>
                            <p className=''>{item.docData.address.line1}</p>
                            <p className=''>{item.docData.address.line2}</p>
                            <p className=' mt-1'><span className='text-sm text-[#3C3C3C] font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} |  {item.slotTime}</p>
                        </div>
                        <div></div>
                        <div className='flex flex-col gap-2 justify-end text-sm text-center'>
                            {!item.cancelled && !item.payment && !item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-primary hover:text-white transition-all duration-300'>Pay Online</button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="Stripe Logo" /></button>}
                            {!item.cancelled && !item.payment && !item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-gray-100 hover:text-white transition-all duration-300 flex items-center justify-center'><img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="Razorpay Logo" /></button>}
                            {!item.cancelled && item.payment && !item.isCompleted && <button className='sm:min-w-48 py-2 border rounded text-[#696969]  bg-[#EAEFFF]'>Paid</button>}

                            {item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>}

                            {!item.cancelled && !item.isCompleted && <button className='text-[#696969] sm:min-w-48 py-2 border rounded hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointment</button>}
                            {item.cancelled && !item.isCompleted && <button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment cancelled</button>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
