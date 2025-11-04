package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.Language;
import com.nickpuleo.dynamic_cv.repositories.LanguageRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/language")
public class LanguageController {

    private final LanguageRepository repo;

    public LanguageController(LanguageRepository repo) {
        this.repo = repo;
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
        return repo.save(body);
}

//@Putmapping


}

@DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        if (!repo.existsById(id)) {
            throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
        } repo.deleteById(id);
}
