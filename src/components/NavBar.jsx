import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate } from 'react-router-dom';

const NavBar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    const user = localStorage.getItem('user');
    setIsAuthenticated(!!accessToken && !!user); 
  }, []);

  
  useEffect(() => {
    const handleStorageChange = () => {
      const accessToken = localStorage.getItem('accessToken');
      const user = localStorage.getItem('user');
      setIsAuthenticated(!!accessToken && !!user);
    };


    window.addEventListener('storage', handleStorageChange); // Listen for changes in localStorage
    return () => window.removeEventListener('storage', handleStorageChange); // Cleanup event listener
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('user');
    setIsAuthenticated(false);
    navigate('/login');
  };

  return (
    <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
      <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />
      
      <ul className='md:flex items-start gap-5 font-medium hidden'>
        <NavLink to='/' >
          <li className='py-1'>HOME</li>
        </NavLink>
        <NavLink to='/doctors' >
          <li className='py-1'>ALL DOCTORS</li>
        </NavLink>
        <NavLink to='/about' >
          <li className='py-1'>ABOUT</li>
        </NavLink>
        <NavLink to='/contact' >
          <li className='py-1'>CONTACT</li>
        </NavLink>
        <NavLink to='/my-appointment' >
          <li className='py-1'>APPOINTMENTS</li>
        </NavLink>
      </ul>

      <div className='flex items-center gap-4'>
        {!isAuthenticated ? (
          // Show "Create account" if not authenticated
          <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
            Create account
          </button>
        ) : (
          // Show "Logout" if authenticated
          <button onClick={handleLogout} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
            LOGOUT
          </button>
        )}
        
        <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu Icon" />

        <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
          <div className='flex items-center justify-between px-5 py-6'>
            <img src={assets.logo} className='w-36' alt="Logo" />
            <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="Close Menu" />
          </div>
          <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
            <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
            <NavLink onClick={() => setShowMenu(false)} to='/my-appointment' ><p className='px-4 py-2 rounded full inline-block'>APPOINTMENTS</p></NavLink>
            {isAuthenticated && (
              <li onClick={() => { handleLogout(); setShowMenu(false); }} className='px-4 py-2 rounded full inline-block cursor-pointer'>
                LOGOUT
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;




// import React, { useState, useEffect } from 'react';
// import { assets } from '../assets/assets';
// import { NavLink, useNavigate } from 'react-router-dom';

// const NavBar = () => {
//   const navigate = useNavigate();
//   const [showMenu, setShowMenu] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     const user = localStorage.getItem('user');
//     setIsAuthenticated(!!token && !!user); 
//   }, [isAuthenticated]);

//   const handleLogout = () => {
   
//     localStorage.removeItem('token');
//     localStorage.removeItem('user');
//     setIsAuthenticated(false); 
//     navigate('/login');
//   };

//   return (
//     <div className='flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]'>
//       <img onClick={() => navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="Logo" />
      
//       <ul className='md:flex items-start gap-5 font-medium hidden'>
//         <NavLink to='/' >
//           <li className='py-1'>HOME</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/doctors' >
//           <li className='py-1'>ALL DOCTORS</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/about' >
//           <li className='py-1'>ABOUT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/contact' >
//           <li className='py-1'>CONTACT</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//         <NavLink to='/my-appointment' >
//           <li className='py-1'>APPOINTMENTS</li>
//           <hr className='border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden' />
//         </NavLink>
//       </ul>

//       <div className='flex items-center gap-4'>
//         {!isAuthenticated ? (
//           <button onClick={() => navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
//             Create account
//           </button>
//         ) : (
//           <button onClick={handleLogout} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
//             LOGOUT
//           </button>
//         )}
        
//         <img onClick={() => setShowMenu(true)} className='w-6 md:hidden' src={assets.menu_icon} alt="Menu Icon" />

//         <div className={`md:hidden ${showMenu ? 'fixed w-full' : 'h-0 w-0'} right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}>
//           <div className='flex items-center justify-between px-5 py-6'>
//             <img src={assets.logo} className='w-36' alt="Logo" />
//             <img onClick={() => setShowMenu(false)} src={assets.cross_icon} className='w-7' alt="Close Menu" />
//           </div>
//           <ul className='flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium'>
//             <NavLink onClick={() => setShowMenu(false)} to='/'><p className='px-4 py-2 rounded full inline-block'>HOME</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/doctors' ><p className='px-4 py-2 rounded full inline-block'>ALL DOCTORS</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/about' ><p className='px-4 py-2 rounded full inline-block'>ABOUT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/contact' ><p className='px-4 py-2 rounded full inline-block'>CONTACT</p></NavLink>
//             <NavLink onClick={() => setShowMenu(false)} to='/my-appointment' ><p className='px-4 py-2 rounded full inline-block'>APPOINTMENTS</p></NavLink>
//             <li onClick={() => { handleLogout(); setShowMenu(false); }} className='px-4 py-2 rounded full inline-block cursor-pointer'>
//               LOGOUT
//             </li>
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default NavBar;

