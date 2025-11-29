package com.academicerp.backend.mapper;

import com.academicerp.backend.DTO.GradeRequest;
import com.academicerp.backend.entity.Enrollment;
import com.academicerp.backend.entity.Grade;
import org.springframework.stereotype.Component;

@Component
public class GradeMapper {

    public Grade toEntity(GradeRequest dto, Enrollment enrollment) {
        Grade grade = new Grade();
        grade.setEnrollment(enrollment);
        grade.setLetterGrade(dto.getLetterGrade());
        grade.setGradePoints(dto.getGradePoints());
        grade.setComments(dto.getComments());
        return grade;
    }

    public GradeRequest toDto(Grade grade) {
        GradeRequest dto = new GradeRequest();
        dto.setEnrollmentId(grade.getEnrollment().getId());
        dto.setLetterGrade(grade.getLetterGrade());
        dto.setGradePoints(grade.getGradePoints());
        dto.setComments(grade.getComments());
        return dto;
    }
}
