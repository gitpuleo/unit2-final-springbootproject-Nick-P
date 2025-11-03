package com.nickpuleo.dynamic_cv.models;

import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table
public class Awards {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String issuer;

    private LocalDate issueDate;

    private String description;


}
