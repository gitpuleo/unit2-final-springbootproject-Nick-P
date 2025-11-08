package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.Language;
import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.repositories.LanguageRepository;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/languages")
public class LanguageController {

    private final LanguageRepository repo;
    private final ResumeRepository resumeRepo;

    public LanguageController(LanguageRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
    }

    @GetMapping
    public List<Language> getAll() {
        return repo.findAll();
    }

    @GetMapping("/{id}")
    public Language getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
    }

    @PostMapping
    public Language create(@RequestBody Language body) {
        //validate correct resume, stop creation of new resumes by accident
        if (body.getResume() == null || body.getResume().getId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume id required");
        }

        Resume existingResume = resumeRepo.findById(body.getResume().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));

        body.setResume(existingResume);
        return repo.save(body);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
        }
        repo.deleteById(id);
    }
    @PutMapping("/{id}")
    public Language update(@PathVariable Long id, @RequestBody Language body) {
        Language existing = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Language not found"));

        // Logic for partial updating
        if (body.getName() != null)           existing.setName(body.getName());
        if (body.getLevel() != null)    existing.setLevel(body.getLevel()); // enum

        // Logic for reattaching parent table
        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existing.setResume(existingResume);
        }

        return repo.save(existing);
    }

}