import axios from 'axios';

const tokenManager = {
  getToken: () => {
    try {
      const token = localStorage.getItem('accessToken'); // Use 'accessToken' as per your components
      const lastUpdated = localStorage.getItem('jwt_token_last_updated'); // This might not be strictly needed if refresh logic handles expiry
      if (token && lastUpdated) {
        const age = Date.now() - parseInt(lastUpdated, 10);
        // Consider if you want to clear token based on a fixed age or rely solely on 401/refresh
        if (age > 24 * 60 * 60 * 1000) { // Example: clear after 24 hours if not refreshed
          // tokenManager.clearToken(); // This might cause aggressive logouts if refresh isn't instant
          // return null;
        }
      }
      return token || null;
    } catch (error) {
      console.error('Token access error:', error);
      return null;
    }
  },
  setToken: (token) => {
    try {
      localStorage.setItem('accessToken', token); // Use 'accessToken'
      localStorage.setItem('jwt_token_last_updated', Date.now().toString());
    } catch (error) {
      console.error('Token storage error:', error);
    }
  },
  clearToken: () => {
    try {
      localStorage.removeItem('accessToken'); // Use 'accessToken'
      localStorage.removeItem('refreshToken'); // Also clear refresh token
      localStorage.removeItem('userRole'); // Clear user role
      localStorage.removeItem('jwt_token_last_updated');
    } catch (error) {
      console.error('Token clearance error:', error);
    }
  }
};

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:5000/api/v1';

class ApiError extends Error {
  constructor(message, type = 'API_ERROR', status = null, isNetworkError = false) {
    super(message);
    this.name = 'ApiError';
    this.type = type;
    this.status = status;
    this.isNetworkError = isNetworkError;
  }
}

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'x-client-version': '1.0.0',
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenManager.getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.headers['x-request-timestamp'] = Date.now();
    return config;
  },
  (error) => {
    return Promise.reject(new ApiError('Failed to setup request', 'REQUEST_ERROR', null, true));
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const apiError = new ApiError(
        error.response.data?.message || error.response.statusText || `Server responded with status ${error.response.status}`,
        'SERVER_ERROR',
        error.response.status,
        false
      );
      apiError.responseData = error.response.data;
      if (error.response.status === 401) {
        tokenManager.clearToken();
        // Optionally, force a reload to trigger re-authentication if not handled by router
        // window.location.reload();
      }
      return Promise.reject(apiError);
    }
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new ApiError('Request timeout. Please try again.', 'TIMEOUT_ERROR', null, true));
    }
    if (error.request) {
      return Promise.reject(new ApiError('No response from server. Please check your connection.', 'NETWORK_ERROR', null, true));
    }
    return Promise.reject(new ApiError(error.message || 'Request failed to be sent', 'REQUEST_ERROR', null, true));
  }
);

const handleApiCall = async (apiCall, maxRetries = 3) => {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await apiCall();
      return { success: true, data: response.data };
    } catch (err) {
      // If it's a network error and not the last attempt, retry
      if (attempt < maxRetries && err.isNetworkError) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      } else {
        // If it's the last attempt or not a network error, propagate the error
        return { success: false, error: err };
      }
    }
  }
  // Should theoretically not be reached if maxRetries > 0
  return { success: false, error: new ApiError('Unknown error after retries', 'UNKNOWN_ERROR', null, true) };
};

const api = {
  admin: {
    getAll: () => handleApiCall(() => axiosInstance.get('/admins')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/admins/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/admins/register', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/admins/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/admins/${id}`)),
    login: (data) => handleApiCall(() => axiosInstance.post('/auth/login', data)), // Corrected endpoint for AdminManagement
  },

  client: {
    getAll: () => handleApiCall(() => axiosInstance.get('/clients')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/clients/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/clients/register', data)), // ✅ Corrected endpoint
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/clients/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/clients/${id}`)),
  },

  guard: {
    getAll: () => handleApiCall(() => axiosInstance.get('/guards')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/guards/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/guards', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/guards/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/guards/${id}`)),
  },

  services: {
    getAll: () => handleApiCall(() => axiosInstance.get('/services')),
    create: (data) => handleApiCall(() => axiosInstance.post('/services', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/services/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/services/${id}`)),
  },

  invoices: {
    getAll: () => handleApiCall(() => axiosInstance.get('/invoices')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/invoices/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/invoices', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/invoices/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/invoices/${id}`)),
  },

  incidents: {
    getAll: () => handleApiCall(() => axiosInstance.get('/incident_reports')),
    create: (data) => handleApiCall(() => axiosInstance.post('/incident_reports', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/incident_reports/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/incident_reports/${id}`)),
  },

  contact_messages: {
    getAll: () => handleApiCall(() => axiosInstance.get('/contact_messages')),
    create: (data) => handleApiCall(() => axiosInstance.post('/contact_messages', data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/contact_messages/${id}`)),
  },

  duty_schedules: {
    getAll: () => handleApiCall(() => axiosInstance.get('/duty_schedules')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/duty_schedules/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/duty_schedules', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/duty_schedules/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/duty_schedules/${id}`)),
  },

  checkHealth: () => handleApiCall(() => axiosInstance.get('/health')),
  getServerTime: () => handleApiCall(() => axiosInstance.get('/time')),
  clearCache: () => handleApiCall(() => axiosInstance.delete('/cache')),
};

export default api;
