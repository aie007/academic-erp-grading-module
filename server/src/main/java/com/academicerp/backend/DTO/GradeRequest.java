package com.academicerp.backend.DTO;

import lombok.Data;

@Data
public class GradeRequest {
    private Long enrollmentId;
    private String letterGrade;
    private Double gradePoints;
    private String comments;
}

