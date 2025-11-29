package com.academicerp.backend.DTO;

import com.academicerp.backend.entity.Enrollment;
import com.academicerp.backend.entity.Grade;
import lombok.Data;

@Data
public class StudentCourseDTO {
    private Long enrollmentId;
    private Long studentId;
    private String name;
    private String email;
    private String letterGrade;
    private Double gradePoints;
    private String comments;

    public StudentCourseDTO(Enrollment e) {
        this.enrollmentId = e.getId();
        this.studentId = e.getStudent().getId();
        this.name = e.getStudent().getName();
        this.email = e.getStudent().getEmail();

        if (e.getGrades() != null && !e.getGrades().isEmpty()) {
            Grade g = e.getGrades().get(0); // assuming one grade per enrollment
            this.letterGrade = g.getLetterGrade();
            this.gradePoints = g.getGradePoints();
            this.comments = g.getComments();
        }
    }

}
