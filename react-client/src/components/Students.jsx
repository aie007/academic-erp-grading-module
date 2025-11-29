// In Students.jsx
import React, { useEffect, useState } from "react";
import { getStudents, getCourseById } from "../utils/api";
import { useParams, Link } from "react-router-dom";
import GradeForm from "./GradeForm";
import BulkGradeForm from "./BulkGradeForm";
import "../assets/styles/students.css";

export default function Students() {
    const { courseId } = useParams();
    const [students, setStudents] = useState([]);
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [selectedStudents, setSelectedStudents] = useState(new Set());
    const [showBulkGradeForm, setShowBulkGradeForm] = useState(false);

    // Toggle student selection
    const toggleStudentSelection = (studentId, e) => {
        e.stopPropagation();
        setSelectedStudents(prev => {
            const newSelection = new Set(prev);
            if (newSelection.has(studentId)) {
                newSelection.delete(studentId);
            } else {
                newSelection.add(studentId);
            }
            return newSelection;
        });
    };

    // Toggle select all students
    const toggleSelectAll = (e) => {
        if (e.target.checked) {
            setSelectedStudents(new Set(students.map(s => s.enrollmentId)));
        } else {
            setSelectedStudents(new Set());
        }
    };

    // Handle bulk grade success
    const handleBulkGradeSuccess = () => {
        setShowBulkGradeForm(false);
        setSelectedStudents(new Set());
        // Refresh student data
        fetchStudents();
    };

    // Fetch students function
    const fetchStudents = async () => {
        try {
            const studentsRes = await getStudents(courseId);
            setStudents(studentsRes.data || []);
        } catch (err) {
            console.error("Error fetching students:", err);
            setError(err.message || "Failed to load students. Please try again.");
        }
    };

    // Fetch data on component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const courseRes = await getCourseById(courseId);
                setCourse(courseRes.data);
                await fetchStudents();
            } catch (err) {
                console.error("Error fetching data:", err);
                setError(err.message || "Failed to load data. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();

        // Cleanup function
        return () => {
            if (document.head.contains(styleElement)) {
                document.head.removeChild(styleElement);
            }
        };
    }, [courseId]);

    if (loading) return <div className="students-loading">Loading course data...</div>;
    if (error) return <div className="students-error">{error}</div>;

    const renderHeader = () => (
        <div className="students-header">
            <h1 className="students-title">
                {course ? `Students Enrolled in ${course.courseName || 'Course'}` : 'Course Students'}
            </h1>
            <div className="students-actions">
                <Link to="/" className="students-action-btn secondary">
                    Back to Courses
                </Link>
            </div>
        </div>
    );

    if (!students || students.length === 0) {
        return (
            <div className="students-container">
                {renderHeader()}
                <div className="students-no-data">No students found in this course.</div>
            </div>
        );
    }

    const selectedCount = selectedStudents.size;

    return (
        <div className="students-container">
            {renderHeader()}

            <div className="students-table-container">
                <table className="students-table">
                    <thead className="students-thead">
                    <tr>
                        <th className="students-th" style={{ width: '40px' }}>
                            <input
                                type="checkbox"
                                className="student-checkbox"
                                checked={selectedCount > 0 && selectedCount === students.length}
                                onChange={toggleSelectAll}
                            />
                        </th>
                        <th className="students-th">Student Name</th>
                        <th className="students-th">Email</th>
                        <th className="students-th">Points</th>
                        <th className="students-th">Grade</th>
                        <th className="students-th">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {students.map(student => (
                        <tr
                            key={student.enrollmentId}
                            className={`students-tr student-row ${selectedStudents.has(student.enrollmentId) ? 'selected' : ''}`}
                            onClick={() => setSelectedStudent(student)}
                        >
                            <td className="students-td" onClick={e => e.stopPropagation()}>
                                <input
                                    type="checkbox"
                                    className="student-checkbox"
                                    checked={selectedStudents.has(student.enrollmentId)}
                                    onChange={(e) => toggleStudentSelection(student.enrollmentId, e)}
                                />
                            </td>
                            <td className="students-td">{student.name || 'N/A'}</td>
                            <td className="students-td">{student.email || 'N/A'}</td>
                            <td className="students-td" style={{ textAlign: 'center' }}>
                                {student.gradePoints !== undefined && student.gradePoints !== null
                                    ? student.gradePoints
                                    : '-'}
                            </td>
                            <td className="students-td" style={{ textAlign: 'center' }}>
                                {student.letterGrade || '-'}
                            </td>
                            <td className="students-td">
                                <button
                                    className="grade-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setSelectedStudent(student);
                                    }}
                                >
                                    Grade
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Bulk Actions */}
            {selectedCount > 0 && (
                <div className="bulk-actions">
                    <button
                        className="btn btn-primary"
                        onClick={() => setShowBulkGradeForm(true)}
                    >
                        <i className="bi bi-pencil-fill me-2"></i>
                        Grade Selected Students ({selectedCount})
                    </button>
                </div>
            )}

            {/* Single Student Grade Form Popup */}
            {selectedStudent && (
                <div className="grade-popup">
                    <div className="grade-popup-content">
                        <button
                            className="close-btn"
                            onClick={() => setSelectedStudent(null)}
                        >
                            &times;
                        </button>
                        <GradeForm
                            enrollmentId={selectedStudent.enrollmentId}
                            initialGrade={selectedStudent.letterGrade}
                            initialPoints={selectedStudent.gradePoints}
                            initialComments={selectedStudent.comments}
                            onSuccess={() => {
                                fetchStudents();
                                setSelectedStudent(null);
                            }}
                        />
                    </div>
                </div>
            )}

            {/* Bulk Grade Form Modal */}
            {showBulkGradeForm && (
                <div className="grade-popup">
                    <div className="grade-popup-content" style={{ maxWidth: '600px' }}>
                        <button
                            className="close-btn"
                            onClick={() => setShowBulkGradeForm(false)}
                        >
                            &times;
                        </button>
                        <h3>Grade {selectedCount} Students</h3>
                        <BulkGradeForm
                            students={students.filter(s => selectedStudents.has(s.enrollmentId))}
                            onSuccess={handleBulkGradeSuccess}
                            onCancel={() => setShowBulkGradeForm(false)}
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
