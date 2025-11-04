package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.LicenseCertification;
import com.nickpuleo.dynamic_cv.repositories.LicenseCertificationRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/LicenseCertification")
public class LicenseCertificationController {

    private final LicenseCertificationRepository repo;

    public LicenseCertificationController(LicenseCertificationRepository repo) {
        this.repo = repo;
    }

@GetMapping
public List<LicenseCertification> getAll() {
        return repo.findAll();
}

@PostMapping
public LicenseCertification create(@RequestBody LicenseCertification body) {
        return repo.save(body);
}

@GetMapping("/{id}")
    public LicenseCertification getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
}

@DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
    if (!repo.existsById(id)) {
        throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
    }
    repo.deleteById(id);
}

//Putmapping


}
