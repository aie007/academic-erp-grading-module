package com.academicerp.backend.service;

import com.academicerp.backend.DTO.EmployeeDTO;
import com.academicerp.backend.entity.Employee;
import com.academicerp.backend.repository.CourseRepository;
import com.academicerp.backend.repository.EmployeeRepository;
import com.academicerp.backend.repository.EnrollmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class EmployeeService {
    @Autowired
    private EmployeeRepository employeeRepo;

    public List<Employee> getAllEmployees() {
        return employeeRepo.findAll();
    }

    public Optional<Employee> getEmployeeByEmail(String email) {
        return employeeRepo.findByEmail(email);
    }

    public Optional<Employee> getEmployeeById(Integer id) {
        return employeeRepo.findById(id);
    }
}
