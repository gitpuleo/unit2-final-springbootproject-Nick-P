package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.nickpuleo.dynamic_cv.models.Skill;



public interface SkillRepository extends JpaRepository<Skill, Long> {

}
