package com.academicerp.backend.DTO;

import lombok.Data;

@Data
public class CourseDTO {
    private Long id;
    private String courseCode;
    private String courseName;
    private Integer courseCredits;
    private String department;
    private Long employeeId;
    private String description;
    private String employeeName;
}
