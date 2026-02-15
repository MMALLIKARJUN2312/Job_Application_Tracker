import apiInstance from "./axios";

// Create new job

export const createJob = async (jobData) => {
    const response = await apiInstance.post('/jobs', jobData);
    return response.data;
}

// Get all jobs

export const getAllJobs = async (params) => {
    const response = await apiInstance.get('/jobs',{params});
    return response.data;
}

// Get Job by Id

export const getJobById = async (id) => {
    const response = await apiInstance.get(`/jobs/${id}`);
    return response.data;
}

// Update job

export const updateJob = async(id, jobData) => {
    const response = await apiInstance.put(`/jobs/${id}`, jobData);
    return response.data;
}

// Delete job

export const deleteJob = async (id) => {
    const response = await apiInstance.delete(`/jobs/${id}`);
    return response.data;
}

// Get job statistics

export const getJobStats = async () => {
    const response = await apiInstance.get("/jobs/stats");
    return response.data;
};
