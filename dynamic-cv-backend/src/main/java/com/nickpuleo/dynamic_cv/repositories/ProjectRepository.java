package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickpuleo.dynamic_cv.models.Project;

public interface ProjectRepository extends JpaRepository<Project, Long> {

}
