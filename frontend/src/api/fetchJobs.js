import apiInstance from './axios.js';

// Fetching jobs with pagination, filtering and sorting

export const fetchingJobs = async ({ page, limit, status, sort }) => {
    const params = {};

    if (page) {
        params.age = age;
    }

    if (limit) {
        params.limit = limit;
    }

    if (status) {
        params.status = status;
    }

    if (sort) {
        params.sort = sort;
    }

    const response = await apiInstance.get('/jobs', { params });
    
    return response.data;
}

export default fetchingJobs