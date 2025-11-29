package com.academicerp.backend.service;

import com.academicerp.backend.entity.Enrollment;
import com.academicerp.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {
    @Autowired
    private EnrollmentRepository enrollmentRepo;

    public List<Enrollment> getEnrollmentsByCourseId(Long courseId) {
        return enrollmentRepo.findByCourseId(courseId);
    }
}
