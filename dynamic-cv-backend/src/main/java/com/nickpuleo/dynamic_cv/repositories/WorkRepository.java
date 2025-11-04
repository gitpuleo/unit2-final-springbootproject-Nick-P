package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickpuleo.dynamic_cv.models.Work;


public interface WorkRepository extends JpaRepository<Work, Long> {

}
