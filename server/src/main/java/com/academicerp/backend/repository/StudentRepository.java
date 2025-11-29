package com.academicerp.backend.repository;

import com.academicerp.backend.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {
//    @Query("SELECT s FROM Student s JOIN s.coursesEnrolled sc WHERE sc.course.courseId = :courseId")
//    List<Student> findByCourseId(@Param("courseId") int courseId);
}
