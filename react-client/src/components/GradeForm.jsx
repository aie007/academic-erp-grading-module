import React, { useState, useEffect } from "react";
import { assignGrade } from "../utils/api";

export default function GradeForm({ 
  enrollmentId, 
  initialGrade = "", 
  initialPoints = "", 
  initialComments = "",
  onSuccess
}) {
  const [formData, setFormData] = useState({
    letterGrade: initialGrade,
    gradePoints: initialPoints,
    comments: initialComments
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  // Update form data when initial values change
  useEffect(() => {
    setFormData({
      letterGrade: initialGrade,
      gradePoints: initialPoints,
      comments: initialComments
    });
  }, [initialGrade, initialPoints, initialComments]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newFormData = {
      ...formData,
      [name]: name === 'gradePoints' ? (value === "" ? "" : parseFloat(value)) : value
    };

    // If grade points are being updated, update the letter grade as well
    if (name === 'gradePoints') {
      const letterGrade = getLetterGrade(value);
      if (letterGrade) {
        newFormData.letterGrade = letterGrade;
      }
    }

    setFormData(newFormData);
  };

  // Update letter grade when component mounts or initialPoints changes
  useEffect(() => {
    if (initialPoints && !initialGrade) {
      const letterGrade = getLetterGrade(initialPoints);
      if (letterGrade) {
        setFormData(prev => ({
          ...prev,
          letterGrade
        }));
      }
    }
  }, [initialPoints, initialGrade]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      // Ensure we have the latest form data
      const gradePoints = formData.gradePoints ? parseFloat(formData.gradePoints) : null;
      const letterGrade = gradePoints !== null ? getLetterGrade(gradePoints) : '';
      
      const payload = {
        enrollmentId,
        letterGrade,
        gradePoints,
        comments: formData.comments || ''
      };
      
      console.log(initialGrade ? 'Updating grade with data:' : 'Creating grade with data:', payload);
      
      await assignGrade(payload);
      setSuccess(true);
      
      // Update the form data with the calculated letter grade
      setFormData(prev => ({
        ...prev,
        letterGrade
      }));
      
      // Notify parent component of successful submission
      if (onSuccess) {
        onSuccess();
      }
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error('Error submitting grade:', err);
      setError(err.response?.data?.message || 'Failed to submit grade. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="grade-form" onSubmit={handleSubmit}>
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white py-3">
          <h4 className="mb-0 fw-semibold">{initialGrade ? 'Update Grade' : 'Assign Grade'}</h4>
        </div>
        <div className="card-body p-4">
          {initialGrade && (
            <div className="alert alert-info mb-4 py-2">
              <i className="bi bi-info-circle me-2"></i>
              You're updating an existing grade for this student.
            </div>
          )}
          
          <div className="mb-4">
            <label htmlFor="letterGrade" className="form-label fw-medium mb-2">Letter Grade</label>
            <input
              type="text"
              id="letterGrade"
              name="letterGrade"
              value={formData.letterGrade || ''}
              readOnly
              className="form-control-plaintext form-control-lg fw-bold"
              style={{ color: '#0d6efd' }}
            />
          </div>
          
          <div className="mb-4">
            <label htmlFor="gradePoints" className="form-label fw-medium mb-2">Grade Points</label>
            <div className="input-group">
              <input 
                id="gradePoints"
                name="gradePoints"
                type="number" 
                step="0.01" 
                min="0" 
                max="4.0"
                placeholder="e.g., 3.5" 
                value={formData.gradePoints || ''} 
                onChange={handleChange} 
                className="form-control form-control-lg py-2"
                style={{ padding: '0.5rem 0.75rem' }}
                required
              />
              <span className="input-group-text">/ 4.0</span>
            </div>
            <div className="form-text mt-1 ps-2">Enter a value between 0.0 and 4.0</div>
          </div>
          
          <div className="mb-4">
            <label htmlFor="comments" className="form-label fw-medium mb-2">Comments</label>
            <textarea 
              id="comments"
              name="comments"
              placeholder="Additional comments about this grade..." 
              value={formData.comments || ''} 
              onChange={handleChange}
              className="form-control py-2"
              style={{ minHeight: '100px', padding: '0.5rem 0.75rem' }}
            />
          </div>
          
          <div className="d-flex justify-content-end gap-3 mt-4 pt-2">
            <button 
              type="button" 
              onClick={() => onSuccess && onSuccess()}
              className="btn btn-outline-secondary px-4 py-2"
              disabled={isSubmitting}
              style={{ minWidth: '100px' }}
            >
              Cancel
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="btn btn-primary px-4 py-2"
              style={{ minWidth: '150px' }}
            >
              {isSubmitting ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  {initialGrade ? 'Updating...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <i className="bi bi-save me-2"></i>
                  {initialGrade ? 'Update Grade' : 'Submit Grade'}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
      
      {error && (
        <div className="alert alert-danger mt-3">
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          {error}
        </div>
      )}
      
      {success && (
        <div className="alert alert-success mt-3">
          <i className="bi bi-check-circle-fill me-2"></i>
          Grade saved successfully!
        </div>
      )}
    </form>
  );
}
