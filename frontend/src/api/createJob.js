import apiInstance from "./axios";

export const createJob = async (jobData) => {
    const response = await apiInstance.post('/jobs', jobData);
    return response.data;
}