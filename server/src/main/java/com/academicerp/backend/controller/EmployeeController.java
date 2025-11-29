package com.academicerp.backend.controller;

import com.academicerp.backend.DTO.BulkGradeRequest;
import com.academicerp.backend.DTO.CourseDTO;
import com.academicerp.backend.DTO.EmployeeDTO;
import com.academicerp.backend.DTO.GradeRequest;
import com.academicerp.backend.DTO.StudentCourseDTO;
import com.academicerp.backend.entity.Course;
import com.academicerp.backend.entity.Employee;
import com.academicerp.backend.entity.Grade;
import com.academicerp.backend.mapper.GradeService;
import com.academicerp.backend.mapper.Mapper;
import com.academicerp.backend.repository.CourseRepository;
import com.academicerp.backend.repository.EmployeeRepository;
import com.academicerp.backend.repository.EnrollmentRepository;
import com.academicerp.backend.mapper.StudentCourseMapper;
import com.academicerp.backend.service.CourseService;
import com.academicerp.backend.service.EmployeeService;
import com.academicerp.backend.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
import java.util.Map;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/employee")
public class EmployeeController {
    private final EmployeeService employeeService;
    private final CourseService courseService;
    private final EnrollmentService enrollmentService;

    private final GradeService gradeService;
    private final StudentCourseMapper studentCourseMapper;
    private final Mapper mapper;

    @Autowired
    public EmployeeController(EmployeeService employeeService,
                            CourseService courseService,
                            EnrollmentService enrollmentService,
                            GradeService gradeService, 
                            StudentCourseMapper studentCourseMapper,
                            Mapper mapper) {
        this.employeeService = employeeService;
        this.courseService = courseService;
        this.enrollmentService = enrollmentService;
        this.gradeService = gradeService;
        this.studentCourseMapper = studentCourseMapper;
        this.mapper = mapper;
    }

    @GetMapping("/courses")
    public List<CourseDTO> getMyCourses(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        Employee emp = employeeService.getEmployeeByEmail(email)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return courseService.getCourseByEmployeeId(emp.getId())
                .stream()
                .map(mapper::toCourseDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/course/{courseId}/students")
    public List<StudentCourseDTO> getStudentsInCourse(@PathVariable Long courseId) {
        return enrollmentService.getEnrollmentsByCourseId(courseId)
                .stream()
                .map(studentCourseMapper::toDto)
                .collect(Collectors.toList());
    }

    @PostMapping("/grade")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public ResponseEntity<?> assignGrade(@RequestBody GradeRequest dto) {
        try {
            Grade grade = gradeService.assignGrade(dto);
            return ResponseEntity.ok(grade);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to submit grade: " + e.getMessage()));
        }
    }

    @PostMapping("/grade/bulk")
    @CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
    public ResponseEntity<?> assignGradesBulk(@RequestBody BulkGradeRequest dto) {
        try {
            if (dto.getGrades() == null || dto.getGrades().isEmpty()) {
                return ResponseEntity.badRequest()
                    .body(Map.of("error", "No grades provided in the request"));
            }
            List<Grade> updatedGrades = gradeService.assignGradesBulk(dto);
            return ResponseEntity.ok(updatedGrades);
        } catch (Exception e) {
            return ResponseEntity
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(Map.of("error", "Failed to update grades: " + e.getMessage()));
        }
    }

    @GetMapping("/me")
    public ResponseEntity<EmployeeDTO> getCurrentEmployee(@AuthenticationPrincipal OAuth2User principal) {
        String email = principal.getAttribute("email");
        return employeeService.getEmployeeByEmail(email)
                .map(mapper::toEmployeeDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public List<EmployeeDTO> getAllEmployees() {
        return employeeService.getAllEmployees().stream()
                .map(mapper::toEmployeeDTO)
                .collect(Collectors.toList());
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmployeeDTO> getEmployeeById(@PathVariable Integer id) {
        return employeeService.getEmployeeById(id)
                .map(mapper::toEmployeeDTO)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}

