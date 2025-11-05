package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.Education;
import com.nickpuleo.dynamic_cv.repositories.EducationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/educations")
public class EducationController {

    private final EducationRepository repo;

    public EducationController(EducationRepository repo) {
        this.repo = repo;
    }

@GetMapping
public List<Education> getAll() {
    return repo.findAll();
}

@GetMapping("/{id}")
    public Education getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
}

@PostMapping
    public Education create(@RequestBody Education body) {
        return repo.save(body);
}

@DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
        throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
        } repo.deleteById(id);
}

//@Putmapping

}
