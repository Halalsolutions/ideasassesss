import axiosInstance from "../api/axios";

export const fetchModules = async () => {
    try {
        const response = await axiosInstance.get('/api/modules/');
        const data = await response.data;
        return data;
    } catch (error) {
        console.log(error);
    }
}