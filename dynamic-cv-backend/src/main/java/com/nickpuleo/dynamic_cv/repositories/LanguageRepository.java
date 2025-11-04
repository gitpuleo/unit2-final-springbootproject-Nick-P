package com.nickpuleo.dynamic_cv.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nickpuleo.dynamic_cv.models.Language;


public interface LanguageRepository extends JpaRepository<Language, Long> {

}
