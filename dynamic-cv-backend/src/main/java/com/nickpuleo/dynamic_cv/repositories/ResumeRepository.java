package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickpuleo.dynamic_cv.models.Resume;


public interface ResumeRepository extends JpaRepository<Resume, Long> {

}
