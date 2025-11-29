package com.academicerp.backend.DTO;

import lombok.Data;

import java.util.List;

@Data
public class BulkGradeRequest {
    private List<GradeRequest> grades;
}