package com.academicerp.backend.mapper;

import com.academicerp.backend.DTO.BulkGradeRequest;
import com.academicerp.backend.DTO.GradeRequest;
import com.academicerp.backend.entity.Enrollment;
import com.academicerp.backend.entity.Grade;
import com.academicerp.backend.repository.EnrollmentRepository;
import com.academicerp.backend.repository.GradeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class GradeService {

    private final EnrollmentRepository enrollmentRepo;
    private final GradeRepository gradeRepo;
    private final GradeMapper gradeMapper;

    public Grade assignGrade(GradeRequest dto) {
        Enrollment enrollment = enrollmentRepo.findById(dto.getEnrollmentId())
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));

        Grade grade = gradeMapper.toEntity(dto, enrollment);
        Grade updatedGrade;
        try {
            if (dto == null) {
                throw new IllegalArgumentException("GradeRequest cannot be null");
            }

            if (dto.getEnrollmentId() == null) {
                throw new IllegalArgumentException("Enrollment ID cannot be null");
            }

            // Get existing grades for this enrollment
            List<Grade> existingGrades = gradeRepo.findByEnrollmentId(dto.getEnrollmentId());
            Grade gradeToUpdate;

            if (existingGrades.isEmpty()) {
                // If no grade exists, create a new one
                gradeToUpdate = new Grade();
                gradeToUpdate.setEnrollment(enrollment);
            } else {
                // Use the first grade found (you might want to handle multiple grades differently)
                gradeToUpdate = existingGrades.get(0);

                // Optional: If there are multiple grades, you might want to log a warning
                if (existingGrades.size() > 1) {
                    System.out.println("Warning: Found " + existingGrades.size() + " grades for enrollment " + dto.getEnrollmentId() + ". Using the first one.");
                }
            }

            // Update the grade details
            gradeToUpdate.setLetterGrade(dto.getLetterGrade());
            gradeToUpdate.setGradePoints(dto.getGradePoints());
            gradeToUpdate.setComments(dto.getComments());

            // Save the updated or new grade
            updatedGrade = gradeRepo.save(gradeToUpdate);

        } catch (Exception e) {
            throw new RuntimeException("Failed to process grade for enrollmentId: " +
                    dto.getEnrollmentId() + ". Error: " + e.getMessage(), e);
        }
        return updatedGrade;
    }
    @Transactional
    public List<Grade> assignGradesBulk(BulkGradeRequest bulkRequest) {
        List<Grade> updatedGrades = new ArrayList<>();
        
        if (bulkRequest == null || bulkRequest.getGrades() == null) {
            throw new IllegalArgumentException("BulkGradeRequest or its grades list cannot be null");
        }

        for (GradeRequest dto : bulkRequest.getGrades()) {
            updatedGrades.add(assignGrade(dto));
        }
        
        return updatedGrades;
    }
}


