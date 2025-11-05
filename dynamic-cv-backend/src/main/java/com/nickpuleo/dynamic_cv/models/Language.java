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

    //Relations
    @ManyToOne
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

    public Language() {}

    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LanguageProficiency getLevel() {
        return level;
    }

    public void setLevel(LanguageProficiency level) {
        this.level = level;
    }
}
