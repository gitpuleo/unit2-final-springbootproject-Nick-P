package com.nickpuleo.dynamic_cv.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.nickpuleo.dynamic_cv.repositories.ProjectRepository;
import com.nickpuleo.dynamic_cv.models.Project;


@RestController
@RequestMapping("/projects")
public class ProjectController {

    private final ProjectRepository repo;

    public ProjectController(ProjectRepository repo) {
        this.repo = repo;
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
        return repo.save(body);
}

@DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
    } repo.deleteById(id);
}

//@PutMapping


}
