package com.nickpuleo.dynamic_cv.models;


import jakarta.persistence.*;

@Entity
@Table
public class LicenseCertification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    private String institution;

    private String description;

    public LicenseCertification() {}

    //Relation
    @ManyToOne
    @JoinColumn(name = "resume_id", nullable = false)
    private Resume resume;

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

    public String getInstitution() {
        return institution;
    }

    public void setInstitution(String institution) {
        this.institution = institution;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Resume getResume() {
        return resume;
    }

    public void setResume(Resume resume) {
        this.resume = resume;
    }

}
