import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check for both token and user data from localStorage
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  // If token and user exist, allow access to the protected route, otherwise redirect to login page
  return token && user ? children : <Navigate to="/login" replace />;
}

export default ProtectedRoute;





// import React from 'react'
// import { Navigate } from 'react-router-dom'
// function ProtectedRoute({children}) {
    
//     const user = JSON.parse(localStorage.getItem("user"))?.user || false;
//   return   user ? children : Navigate({to:'/login'});
  
// }

// export default ProtectedRoute
