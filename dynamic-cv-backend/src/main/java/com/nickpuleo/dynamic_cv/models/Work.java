package com.nickpuleo.dynamic_cv.models;

import jakarta.persistence.*;
import org.springframework.boot.context.properties.bind.DefaultValue;

import java.time.LocalDate;

@Entity
@Table
public class Work {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //FK

    private String company;
    private String job_title;

    private String locationCity;

    private String locationState;

    private String locationCountry;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ExperienceType type;

    @Column(nullable = false)
    private LocalDate startDate;

    @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private Boolean isCurrent;

    private String summary;

}
