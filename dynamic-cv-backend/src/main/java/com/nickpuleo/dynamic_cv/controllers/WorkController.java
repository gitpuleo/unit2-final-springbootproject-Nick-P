package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Work;
import com.nickpuleo.dynamic_cv.repositories.WorkRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@RequestMapping("/works")
public class WorkController {

    private final WorkRepository repo;

    public WorkController(WorkRepository repo) {
        this.repo = repo;
    }

@GetMapping
public List<Work> getAll() {
        return repo.findAll();
}

@GetMapping("/{id}")
    public Work getOne(@PathVariable Long id) {
    return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
}

@PostMapping
    public Work create(@RequestBody Work body) {
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
