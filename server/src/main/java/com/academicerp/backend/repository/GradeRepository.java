package com.academicerp.backend.repository;

import com.academicerp.backend.entity.Grade;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer> {
    List<Grade> findByEnrollmentId(Long enrollmentId);
    
    default Grade findFirstByEnrollmentId(Long enrollmentId) {
        List<Grade> grades = findByEnrollmentId(enrollmentId);
        return grades.isEmpty() ? null : grades.get(0);
    }
}
