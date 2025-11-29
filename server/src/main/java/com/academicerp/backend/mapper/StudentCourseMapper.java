package com.academicerp.backend.mapper;

import com.academicerp.backend.DTO.StudentCourseDTO;
import com.academicerp.backend.entity.Enrollment;
import org.springframework.stereotype.Component;

@Component
public class StudentCourseMapper {

    public StudentCourseDTO toDto(Enrollment enrollment) {
        return new StudentCourseDTO(enrollment);
    }
}
