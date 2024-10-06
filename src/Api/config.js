import axios from 'axios';
const baseURL = import.meta.env.VITE_BACKEND_URL; 

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // You can set a timeout if necessary
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken'); // Get the access token from local storage
    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token expiration
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // Check if the error is due to expired token (401 status)
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Mark request as retried

      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        try {
          // Call refresh token API to get a new access token
          const refreshResponse = await axios.post(`${baseURL}/api/user/refresh-token`, {
            refreshToken
          });
          console,console.log(("refresh token response----",refreshResponse));
          
          const newAccessToken = refreshResponse.data.accessToken;

          // Store the new access token
          localStorage.setItem('accessToken', newAccessToken);

          // Update the original request with new access token
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

          // Retry the original request with the new access token
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          // Redirect to login page or show session expired message
          window.location.href = '/login'; // Or use navigate('/login')
        }
      } else {
        // No refresh token available, redirect to login
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;