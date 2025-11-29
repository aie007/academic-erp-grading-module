package com.academicerp.backend.service;

import com.academicerp.backend.entity.Course;
import com.academicerp.backend.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CourseService {
    @Autowired
    private CourseRepository courseRepository;

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Integer id) {
        return courseRepository.findById(id);
    }

    public List<Course> getCourseByEmployeeId(Long employeeId) {
        return courseRepository.findByEmployeeId(employeeId);
    }
}
