package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Resume;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;


@RestController
@RequestMapping("/api/resumes")
public class ResumeController {

    //retrieve resume
    // GET http://localhost:8080/api/resumes
    @GetMapping("")
    public Collection<Resume> getAllResumes() {
        // return Resumes.findAll(); from the database
    }
}
