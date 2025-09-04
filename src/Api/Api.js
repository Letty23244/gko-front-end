
import axios from 'axios';

const tokenManager = {
  getToken: () => {
    try {
      const token = localStorage.getItem('accessToken');
      return token || null;
    } catch (error) {
      console.error('Token access error:', error);
      return null;
    }
  },
  setToken: (token) => {
    try {
      localStorage.setItem('accessToken', token);
    } catch (error) {
      console.error('Token storage error:', error);
    }
  },
  clearToken: () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('userRole');
      localStorage.removeItem('jwt_token_last_updated');
    } catch (error) {
      console.error('Token clearance error:', error);
    }
  }
};

const API_BASE_URL = process.env.REACT_APP_API_URL;

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
      if (attempt < maxRetries && err.isNetworkError) {
        await new Promise(resolve => setTimeout(resolve, 1000 * Math.pow(2, attempt - 1)));
      } else {
        return { success: false, error: err };
      }
    }
  }
  return { success: false, error: new ApiError('Unknown error after retries', 'UNKNOWN_ERROR', null, true) };
};

const api = {
  // New, dedicated service for authentication
  auth: {
    login: (data) => handleApiCall(() => axiosInstance.post('/auth/login', data)),
  },
  // Existing services
  admin: {
    getAll: () => handleApiCall(() => axiosInstance.get('/admins')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/admins/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/admins/register', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/admins/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/admins/${id}`)),
  },
  client: {
    getAll: () => handleApiCall(() => axiosInstance.get('/clients')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/clients/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/clients/register', data)),
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
    getAll: () => handleApiCall(() => axiosInstance.get('/contacts')),
    create: (data) => handleApiCall(() => axiosInstance.post('/contacts/register', data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/contacts/${id}`)),
  },
  duty_schedules: {
    getAll: () => handleApiCall(() => axiosInstance.get('/duty_schedules')),
    getById: (id) => handleApiCall(() => axiosInstance.get(`/duty_schedules/${id}`)),
    create: (data) => handleApiCall(() => axiosInstance.post('/duty_schedules', data)),
    update: (id, data) => handleApiCall(() => axiosInstance.put(`/duty_schedules/${id}`, data)),
    delete: (id) => handleApiCall(() => axiosInstance.delete(`/duty_schedules/${id}`)),
  },

    home: {
    get: () => handleApiCall(() => axiosInstance.get('/home/')),
    update: (data) => handleApiCall(() => axiosInstance.put('/home/', data))
  },

  //  Career endpoints
  career: {
    getAll: () => handleApiCall(() => axiosInstance.get('/careers/')),  // Get all job postings
    addJob: (data) => handleApiCall(() => axiosInstance.post('/careers/add', data)), // Add a new job
    apply: (formData) => handleApiCall(() => axiosInstance.post('/careers/apply', formData, {
      headers: { 'Content-Type': 'multipart/form-data' } 
    })), 
  },
  checkHealth: () => handleApiCall(() => axiosInstance.get('/health')),
  getServerTime: () => handleApiCall(() => axiosInstance.get('/time')),
  clearCache: () => handleApiCall(() => axiosInstance.delete('/cache')),
};

export default api;
