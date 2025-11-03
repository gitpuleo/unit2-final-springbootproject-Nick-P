package com.nickpuleo.dynamic_cv.models;


import jakarta.persistence.*;

@Entity
@Table
public class Language {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private LanguageProficiency level;


}
