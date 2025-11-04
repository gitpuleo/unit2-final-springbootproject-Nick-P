package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickpuleo.dynamic_cv.models.Education;


public interface EducationRepository extends JpaRepository<Education, Long> {

}
