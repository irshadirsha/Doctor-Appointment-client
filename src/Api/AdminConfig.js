import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;

const axiosInstance = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor to include the access token in headers
axiosInstance.interceptors.request.use(
  (config) => {
    const adminaccessToken = localStorage.getItem('adminaccessToken');
    if (adminaccessToken) {
      config.headers['Authorization'] = `Bearer ${adminaccessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle token expiration (401 Unauthorized)
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
  
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
  
        const adminrefreshToken = localStorage.getItem('adminrefreshToken');
        if (!adminrefreshToken) {
          console.error('No refresh token found, redirecting to login');
          window.location.href = '/admin-login';
          return;
        }
  
        try {
          const refreshResponse = await axios.post(`${baseURL}/api/admin/refresh-token`, { adminrefreshToken });
          const newAccessToken = refreshResponse.data.accessToken;
          localStorage.setItem('adminaccessToken', newAccessToken);
  
          originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing access token:', refreshError);
          window.location.href = '/admin-login';
        }
      }
      return Promise.reject(error);
    }
  );
  

export default axiosInstance;
