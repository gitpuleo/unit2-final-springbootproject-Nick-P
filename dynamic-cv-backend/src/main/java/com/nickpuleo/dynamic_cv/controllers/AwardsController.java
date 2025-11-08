package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Award;
import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.repositories.AwardRepository;
import java.util.List;

import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/awards")
public class AwardsController {

    private final AwardRepository repo;
    private final ResumeRepository resumeRepo;

    public AwardsController(AwardRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
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
    public Award update(@PathVariable Long id, @RequestBody Award body) {
        Award existingAward = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Award not found"));

        // logic for partial updating
        if (body.getName() != null) existingAward.setName(body.getName());
        if (body.getIssuer() != null) existingAward.setIssuer(body.getIssuer());
        if (body.getIssueDate() != null) existingAward.setIssueDate(body.getIssueDate()); // LocalDate ISO in JSON
        if (body.getDescription() != null) existingAward.setDescription(body.getDescription());

        // Logic for reattaching parent table
        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existingAward.setResume(existingResume);
        }

        return repo.save(existingAward);
    }

}
