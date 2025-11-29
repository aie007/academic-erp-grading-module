package com.academicerp.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "course_id")
    private Long id;

    private String courseCode;
    private String courseName;
    private Integer courseCredits;
    private String department;
    private String description;

    @ManyToOne
    @JoinColumn(name = "employee_id")
    @JsonIgnoreProperties("courses")  // Prevents infinite recursion
    private Employee employee;

    @OneToMany(mappedBy = "course")
    @JsonIgnoreProperties("course")   // Prevents infinite recursion with Enrollment
    private List<Enrollment> enrollments;
}

