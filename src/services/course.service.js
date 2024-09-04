import axiosInstance from '../api/axios';

export const fetchCourses = async () => {
  try {
    const response = await axiosInstance.get(
      '/api/courses/',
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCourse = async (courseId) => {
  try {
    const response = await axiosInstance.get(
      `/api/courses/${courseId}/`,
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const fetchCourseForStudent = async (courseId) => {
  try {
    const response = await axiosInstance.get(
      `/api/courses/${courseId}/assessments/`,
    );
    const data = await response.data;
    return data;
  } catch (error) {
    console.log(error);
  }
};
