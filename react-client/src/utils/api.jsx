import axios from "axios";

const API_URL = "http://localhost:8080";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true // This is needed to include cookies with cross-origin requests
});

export const getCurrentEmployee = () => api.get("/api/employee/me");
export const getCourses = () => {
  console.log('Making API call to /api/employee/courses');
  return api.get("/api/employee/courses")
    .then(res => {
      console.log('Raw API response:', res);
      return res;
    });
};
export const getStudents = (courseId) => api.get(`/api/employee/course/${courseId}/students`);
export const getCourseById = (courseId) => api.get(`/api/courses/${courseId}`);
export const assignGrade = (data) => {
  console.log('Submitting grade data:', data);
  return api.post("/api/employee/grade", data)
    .then(response => {
      console.log('Grade submission successful:', response);
      return response;
    })
    .catch(error => {
      console.error('Error submitting grade:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error; // Re-throw to allow component to handle the error
    });
};
export const assignBulkGrades = (data) => {
  console.log('Submitting bulk grades:', data);
  return api.post("/api/employee/grade/bulk", data)
    .then(response => {
      console.log('Bulk grades submission successful:', response);
      return response;
    })
    .catch(error => {
      console.error('Error submitting bulk grades:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      throw error; // Re-throw to allow component to handle the error
    });
};
export const logout = () => {
  console.log('Initiating logout...');
  return api.post("/logout")
    .then(response => {
      console.log('Logout successful:', response);
      // Clear any stored tokens or user data
      if (window && window.localStorage) {
        window.localStorage.removeItem('user');
      }
      return response;
    })
    .catch(error => {
      console.error('Logout error:', {
        message: error.message,
        code: error.code,
        response: error.response?.data,
        status: error.response?.status
      });
      
      // Even if logout fails, we should still clear local data
      if (window && window.localStorage) {
        window.localStorage.removeItem('user');
      }
      
      // For network errors, we'll still consider it a successful logout on the client side
      if (error.code === 'ERR_NETWORK') {
        return { data: { success: true, message: 'Logged out successfully (network disconnected)' } };
      }
      
      throw error;
    });
};