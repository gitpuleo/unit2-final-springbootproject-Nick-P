package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.nickpuleo.dynamic_cv.repositories.ProjectRepository;
import com.nickpuleo.dynamic_cv.models.Project;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectRepository repo;
    private final ResumeRepository resumeRepo;

    public ProjectController(ProjectRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
    }

@GetMapping
    public List<Project> getAll() {
        return repo.findAll();
}

@GetMapping("/{id}")
public Project getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
}

@PostMapping
    public Project create(@RequestBody Project body) {
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
    } repo.deleteById(id);
}

    @PutMapping("/{id}")
    public Project update(@PathVariable Long id, @RequestBody Project body) {
        Project existingProject = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Project not found"));

        //Logic for partial updating
        if (body.getName() != null) existingProject.setName(body.getName());
        if (body.getDescription() != null) existingProject.setDescription(body.getDescription());
        if (body.getLink() != null) existingProject.setLink(body.getLink());

        //Logic for reattaching parent table
        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existingProject.setResume(existingResume);
        }

        return repo.save(existingProject);
    }


}
