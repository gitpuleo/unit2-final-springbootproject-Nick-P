package com.nickpuleo.dynamic_cv.models;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMax;
import jakarta.validation.constraints.DecimalMin;

import java.math.BigDecimal;

@Entity
@Table
public class Education {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String schoolName;

    private String locationState;

    private String locationCity;

    private String locationCountry;

    private String degree;

    private String major;

    private String minor;

    @DecimalMin("0.00")
    @DecimalMax("4.00")
    @Column(precision = 3, scale = 2)
    private BigDecimal gpa;

}
