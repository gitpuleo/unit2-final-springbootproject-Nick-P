package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickpuleo.dynamic_cv.models.Award;


public interface AwardRepository extends JpaRepository<Award, Long> {

}
