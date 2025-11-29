import React, { useState, useEffect } from "react";
import { assignBulkGrades } from "../utils/api";

export default function BulkGradeForm({ students, onSuccess }) {
  const [grades, setGrades] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Initialize grades state when students prop changes
  useEffect(() => {
    if (students && students.length > 0) {
      setGrades(students.map(student => ({
        enrollmentId: student.enrollmentId,
        studentName: student.name,
        letterGrade: student.letterGrade || "",
        gradePoints: student.gradePoints || "",
        comments: student.comments || ""
      })));
    }
  }, [students]);

  const getLetterGrade = (points) => {
    const gradePoints = parseFloat(points);
    if (isNaN(gradePoints)) return '';
    
    if (gradePoints >= 3.6) return 'A';
    if (gradePoints >= 3.1) return 'A-';
    if (gradePoints >= 2.6) return 'B';
    if (gradePoints >= 2.1) return 'C';
    if (gradePoints >= 1.3) return 'D';
    return 'F';
  };

  const handleChange = (index, field, value) => {
    const updated = [...grades];
    const updatedGrade = {
      ...updated[index],
      [field]: field === 'gradePoints' ? (value === "" ? "" : parseFloat(value)) : value
    };

    // If grade points are being updated, update the letter grade as well
    if (field === 'gradePoints') {
      const letterGrade = getLetterGrade(value);
      updatedGrade.letterGrade = letterGrade;
    }
    
    updated[index] = updatedGrade;
    setGrades(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      // Filter out any empty grades
      const validGrades = grades.filter(g => g.letterGrade || g.gradePoints || g.comments);
      
      if (validGrades.length === 0) {
        throw new Error("Please enter at least one grade");
      }

      console.log('Submitting grades for selected students:', { grades: validGrades });
      
      await assignBulkGrades({ grades: validGrades });
      
      setSuccess(true);
      if (onSuccess) onSuccess();
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      console.error('Bulk grade submission failed:', err);
      setError(err.response?.data?.message || err.message || 'Failed to submit grades. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!students || students.length === 0) {
    return <div>No students selected for grading.</div>;
  }

  return (
    <div style={{ marginTop: '20px' }}>
      <h4>Assign Grades</h4>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          {grades.map((grade, idx) => (
            <div 
              key={grade.enrollmentId} 
              style={{ 
                display: 'grid',
                gridTemplateColumns: '150px 80px 100px 1fr',
                gap: '10px',
                marginBottom: '10px',
                alignItems: 'center'
              }}
            >
              <div>{grade.studentName}</div>
              <input 
                type="text"
                placeholder="Grade (A, B+, etc.)"
                value={grade.letterGrade}
                onChange={e => handleChange(idx, "letterGrade", e.target.value)}
                style={{ padding: '5px' }}
                disabled={true}
              />
              <input 
                type="number" 
                step="0.01"
                min="0"
                max="4.0"
                placeholder="Points"
                value={grade.gradePoints}
                onChange={e => handleChange(idx, "gradePoints", e.target.value)}
                style={{ padding: '5px' }}
              />
              <input 
                type="text"
                placeholder="Comments"
                value={grade.comments}
                onChange={e => handleChange(idx, "comments", e.target.value)}
                style={{ padding: '5px', flex: 1 }}
              />
            </div>
          ))}
        </div>

        {error && (
          <div style={{ 
            color: 'white',
            backgroundColor: '#ff4444',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            Error: {error}
          </div>
        )}

        {success && (
          <div style={{ 
            color: 'white',
            backgroundColor: '#4CAF50',
            padding: '10px',
            borderRadius: '4px',
            marginBottom: '15px'
          }}>
            Grades submitted successfully!
          </div>
        )}

        <button 
          type="submit" 
          disabled={isSubmitting}
          style={{
            backgroundColor: isSubmitting ? '#cccccc' : '#4CAF50',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '4px',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
            fontSize: '16px'
          }}
        >
          {isSubmitting ? 'Submitting...' : 'Save All Grades'}
        </button>
      </form>
    </div>
  );
}