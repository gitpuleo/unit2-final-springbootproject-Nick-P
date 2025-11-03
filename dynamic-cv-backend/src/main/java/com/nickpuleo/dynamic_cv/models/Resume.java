package com.nickpuleo.dynamic_cv.models;


import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;

@Entity
class Resume {
    @Id @GeneratedValue
    Long id;
}
