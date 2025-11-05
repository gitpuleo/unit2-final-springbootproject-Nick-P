package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Award;
import com.nickpuleo.dynamic_cv.repositories.AwardRepository;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/awards")
public class AwardsController {

    private final AwardRepository repo;

    public AwardsController(AwardRepository repo) {
        this.repo = repo;
    }

@GetMapping
public List<Award> getAll() {
        return repo.findAll();
}

@GetMapping("/{id}")
    public Award getOne(@PathVariable Long id) {
    return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
}

@PostMapping
    public Award create(@RequestBody Award body) {
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
