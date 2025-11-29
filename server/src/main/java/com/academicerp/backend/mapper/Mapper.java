package com.academicerp.backend.mapper;
import com.academicerp.backend.DTO.CourseDTO;
import com.academicerp.backend.DTO.EmployeeDTO;
import com.academicerp.backend.entity.Course;
import com.academicerp.backend.entity.Employee;
import org.springframework.stereotype.Component;

@Component
public class Mapper {
    public CourseDTO toCourseDTO(Course course) {
        if (course == null) return null;

        CourseDTO dto = new CourseDTO();
        dto.setId(course.getId());
        dto.setCourseCode(course.getCourseCode());
        dto.setCourseName(course.getCourseName());
        dto.setCourseCredits(course.getCourseCredits());
        dto.setDepartment(course.getDepartment());
        dto.setDescription(course.getDescription());
        if (course.getEmployee() != null) {
            dto.setEmployeeId(course.getEmployee().getId());
            dto.setEmployeeName(course.getEmployee().getName());
        }

        return dto;
    }

    public EmployeeDTO toEmployeeDTO(Employee employee) {
        if (employee == null) return null;

        EmployeeDTO dto = new EmployeeDTO();
        dto.setId(employee.getId());
        dto.setName(employee.getName());
        dto.setEmail(employee.getEmail());

        return dto;
    }
}