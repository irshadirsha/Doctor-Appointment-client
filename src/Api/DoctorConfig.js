import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL; // Your backend URL from environment variables

// Create an axios instance for doctor-related API requests
const doctorAxiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000, // Set timeout
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token in headers
doctorAxiosInstance.interceptors.request.use(
  (config) => {
    const doctorAccessToken = localStorage.getItem('doctorAccessToken');
    if (doctorAccessToken) {
      config.headers['Authorization'] = `Bearer ${doctorAccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration (401 Unauthorized)
doctorAxiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const doctorRefreshToken = localStorage.getItem('doctorRefreshToken');
        if (!doctorRefreshToken) {
          toast.error('Session expired. Please log in again.');
          window.location.href = '/doctor-login';
          return;
        }
  
        try {
          const refreshResponse = await axios.post(`${baseURL}/api/doctor/refresh-token`, { refreshToken: doctorRefreshToken });
          const newAccessToken = refreshResponse.data.accessToken;
  
          localStorage.setItem('doctorAccessToken', newAccessToken);
  
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return doctorAxiosInstance(originalRequest);
        } catch (refreshError) {
          toast.error('Session expired. Please log in again.');
          window.location.href = '/doctor-login';
        }
      }
      return Promise.reject(error);
    }
  );
  

export default doctorAxiosInstance;
