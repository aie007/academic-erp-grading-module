package com.academicerp.backend.mapper;

import com.academicerp.backend.DTO.GradeRequest;
import com.academicerp.backend.entity.Enrollment;
import com.academicerp.backend.entity.Grade;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface GradeMapperMapStruct {
    GradeMapperMapStruct INSTANCE = Mappers.getMapper(GradeMapperMapStruct.class);

    @Mapping(target = "enrollment", source = "enrollment")
    Grade toEntity(GradeRequest dto, Enrollment enrollment);

    GradeRequest toDto(Grade grade);
}
