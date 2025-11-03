package com.nickpuleo.dynamic_cv.models;

import jakarta.persistence.*;

@Entity
@Table
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String description;

    private String link;

}
