package com.nickpuleo.dynamic_cv.models;

import jakarta.persistence.*;

@Entity
@Table
public class Skill {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String skillName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private ProficiencyLevel level;

    private String notes;

}
