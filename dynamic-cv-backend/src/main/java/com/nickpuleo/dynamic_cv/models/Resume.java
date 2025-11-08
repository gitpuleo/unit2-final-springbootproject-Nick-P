package com.nickpuleo.dynamic_cv.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Resume {
    @Id @GeneratedValue
    private Long id;


    //Relation to parent
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    //Relation to child tables
    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-skill")
    private List<Skill> skills = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-award")
    private List<Award> awards = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-education")
    private List<Education> educations = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-language")
    private List<Language> languages = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-project")
    private List<Project> projects = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-work")
    private List<Work> works = new ArrayList<>();

    @OneToMany(mappedBy = "resume", cascade = CascadeType.ALL, orphanRemoval = true)
    @com.fasterxml.jackson.annotation.JsonManagedReference("resume-license")
    private List<LicenseCertification> licenses = new ArrayList<>();


    public Resume() {}

    //Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public List<Skill> getSkills() {
        return skills;
    }

    public void setSkills(List<Skill> skills) {
        this.skills = skills;
    }

    public List<Award> getAwards() {
        return awards;
    }

    public void setAwards(List<Award> awards) {
        this.awards = awards;
    }

    public List<Education> getEducations() {
        return educations;
    }

    public void setEducations(List<Education> educations) {
        this.educations = educations;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }

    public List<Project> getProjects() {
        return projects;
    }

    public void setProjects(List<Project> projects) {
        this.projects = projects;
    }

    public List<Work> getWorks() {
        return works;
    }

    public void setWorks(List<Work> works) {
        this.works = works;
    }

    public List<LicenseCertification> getLicenses() {
        return licenses;
    }

    public void setLicenses(List<LicenseCertification> licenses) {
        this.licenses = licenses;
    }

//Helper methods to reign in table syncing issues

public void addSkill(Skill skill) {
    skills.add(skill);
    skill.setResume(this);
}
    public void removeSkill(Skill skill) {
        skills.remove(skill);
        skill.setResume(null);
    }

    public void addAward(Award award) {
        awards.add(award);
        award.setResume(this);
    }
    public void removeAward(Award award) {
        awards.remove(award);
        award.setResume(null);
    }

    public void addEducation(Education education) {
        educations.add(education);
        education.setResume(this);
    }
    public void removeEducation(Education education) {
        educations.remove(education);
        education.setResume(null);
    }

    public void addLanguage(Language language) {
        languages.add(language);
        language.setResume(this);
    }
    public void removeLanguage(Language language) {
        languages.remove(language);
        language.setResume(null);
    }

    public void addProject(Project project) {
        projects.add(project);
        project.setResume(this);
    }
    public void removeProject(Project project) {
        projects.remove(project);
        project.setResume(null);
    }

    public void addWork(Work work) {
        works.add(work);
        work.setResume(this);
    }
    public void removeWork(Work work) {
        works.remove(work);
        work.setResume(null);
    }

    public void addLicense(LicenseCertification license) {
        licenses.add(license);
        license.setResume(this);
    }
    public void removeLicense(LicenseCertification license) {
        licenses.remove(license);
        license.setResume(null);
    }
}
