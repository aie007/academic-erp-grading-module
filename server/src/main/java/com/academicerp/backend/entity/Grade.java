package com.academicerp.backend.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class Grade {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "grade_id")
    private Long id;

    @Column(name = "letter_grade")
    private String letterGrade;

    @Column(name = "grade_points")
    private Double gradePoints;

    @Column(name = "comments")
    private String comments;

    @ManyToOne
    @JoinColumn(name = "enrollment_id")
    private Enrollment enrollment;
}

