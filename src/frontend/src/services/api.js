import axios from 'axios';

const API_URL = 'http://192.168.1.100:8000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true,
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('adminToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Add response interceptor to handle errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('adminToken');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

// Auth services
export const register = async (userData) => {
    const response = await api.post('/auth/register', userData);
    return response.data;
};

export const verifyOTP = async (email, otpCode) => {
    const response = await api.post('/auth/verify-otp', { email, otp_code: otpCode });
    if (response.data.access_token) {
        localStorage.setItem('adminToken', response.data.access_token);
    }
    return response.data;
};

// Data services
export const getCities = async () => {
    const response = await api.get('/data/cities');
    return response.data;
};

export const getCitiesByWilaya = async (wilayaCode) => {
    const response = await api.get(`/data/cities/${wilayaCode}`);
    return response.data;
};

export const getFaculties = async () => {
    const response = await api.get('/data/faculties');
    return response.data;
};

export const getDepartmentsByFaculty = async (facultyId) => {
    const response = await api.get(`/data/departments/${facultyId}`);
    return response.data;
};

// Admin services
export const adminLogin = async (email, password) => {
    try {
        const formData = new URLSearchParams();
        formData.append('username', email);
        formData.append('password', password);
        
        const response = await api.post('/admin/login', formData, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });
        
        if (response.data.access_token) {
            localStorage.setItem('adminToken', response.data.access_token);
            return response.data;
        }
        throw new Error('No access token received');
    } catch (error) {
        console.error('Login error:', error);
        if (error.response) {
            throw new Error(error.response.data.detail || 'Login failed');
        }
        throw new Error('Network error. Please check your connection.');
    }
};

export const getAdminProfile = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            console.error('No admin token found');
            throw new Error('Not authenticated');
        }
        
        console.log('Fetching admin profile with token:', token);
        const response = await api.get('/admin/profile');
        console.log('Admin profile response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching admin profile:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.detail || 'Failed to fetch admin profile');
        }
        throw new Error('Network error. Please check your connection.');
    }
};

export const getAdminLoginHistory = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            console.error('No admin token found');
            throw new Error('Not authenticated');
        }
        
        console.log('Fetching login history with token:', token);
        const response = await api.get('/admin/login-history');
        console.log('Login history response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Error fetching login history:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.detail || 'Failed to fetch login history');
        }
        throw new Error('Network error. Please check your connection.');
    }
};

export const getAnalytics = async () => {
    try {
        const token = localStorage.getItem('adminToken');
        if (!token) {
            console.error('No admin token found');
            throw new Error('Not authenticated');
        }
        
        const response = await api.get('/admin/analytics');
        return response.data;
    } catch (error) {
        console.error('Error fetching analytics:', error);
        if (error.response) {
            console.error('Error response:', error.response.data);
            throw new Error(error.response.data.detail || 'Failed to fetch analytics');
        }
        throw new Error('Network error. Please check your connection.');
    }
};

export default api; 