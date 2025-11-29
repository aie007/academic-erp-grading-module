import React, { useEffect, useState } from "react";
import { getCourses } from "../utils/api";
import { Link } from "react-router-dom";
import "../assets/styles/courses.css";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await getCourses();
        console.log("Courses API Response:", res);
        
        const coursesData = res?.data;
        console.log("Courses data:", coursesData);
        
        if (Array.isArray(coursesData)) {
          setCourses(coursesData);
        } else if (coursesData && typeof coursesData === 'object') {
          const dataArray = Object.values(coursesData).find(Array.isArray);
          if (dataArray) {
            setCourses(dataArray);
          } else {
            throw new Error("Could not find courses array in response");
          }
        } else {
          throw new Error("Unexpected data format received from server");
        }
      } catch (err) {
        console.error("Error in Courses component:", err);
        setError(err.message || "Failed to load courses. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCourses();
  }, []);

  if (loading) return <div className="courses-loading">Loading courses...</div>;
  if (error) return <div className="courses-error">{error}</div>;
  if (!courses || courses.length === 0) {
    return <div className="courses-no-data">No courses found. Please check back later.</div>;
  }

  return (
    <div className="courses-container">
      <h1 className="courses-title">My Courses</h1>
      <table className="courses-table">
        <thead className="courses-thead">
          <tr>
            <th className="courses-th">Course Code</th>
            <th className="courses-th">Course Name</th>
            <th className="courses-th">Department</th>
            <th className="courses-th">Credits</th>
            <th className="courses-th">Course Credits</th>
            <th className="courses-th">Actions</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((course) => (
            <tr key={course.id || course.courseId} className="courses-tr">
              <td className="courses-td">{course.courseCode || 'N/A'}</td>
              <td className="courses-td">{course.courseName || 'Unnamed Course'}</td>
              <td className="courses-td">{course.department || 'N/A'}</td>
              <td className="courses-td">{course.credits || 'N/A'}</td>
              <td className="courses-td">{course.courseCredits || 'N/A'}</td>
              <td className="courses-td">
                <Link 
                  to={`/course/${course.id || course.courseId}`}
                  className="courses-action-btn"
                >
                  View Students
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
