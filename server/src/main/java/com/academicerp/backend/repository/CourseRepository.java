package com.academicerp.backend.repository;

import com.academicerp.backend.entity.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    List<Course> findByEmployeeId(Long employeeId);
}