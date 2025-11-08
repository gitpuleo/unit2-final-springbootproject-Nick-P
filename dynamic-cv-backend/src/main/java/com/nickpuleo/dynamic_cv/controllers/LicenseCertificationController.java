package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.LicenseCertification;
import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.repositories.LicenseCertificationRepository;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/licenses")
public class LicenseCertificationController {

    private final LicenseCertificationRepository repo;
    private final ResumeRepository resumeRepo;

    public LicenseCertificationController(LicenseCertificationRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
    }

@GetMapping
public List<LicenseCertification> getAll() {
        return repo.findAll();
}

@PostMapping
public LicenseCertification create(@RequestBody LicenseCertification body) {
    //validate correct resume, stop creation of new resumes by accident
    if (body.getResume() == null || body.getResume().getId() == null) {
        throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume id required");
    }

    Resume existingResume = resumeRepo.findById(body.getResume().getId())
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));

    body.setResume(existingResume);
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

    @PutMapping("/{id}")
    public LicenseCertification update(@PathVariable Long id,
                                       @RequestBody LicenseCertification body) {
        LicenseCertification existingLicense = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "License/Certification not found"));

        //Logic for partial updating
        if (body.getName() != null) existingLicense.setName(body.getName());
        if (body.getInstitution() != null) existingLicense.setInstitution(body.getInstitution());
        if (body.getDescription() != null) existingLicense.setDescription(body.getDescription());

        //logic for reattaching parent table
        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existingLicense.setResume(existingResume);
        }

        return repo.save(existingLicense);
    }

}
