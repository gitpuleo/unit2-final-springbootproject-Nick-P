package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.models.Work;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import com.nickpuleo.dynamic_cv.repositories.WorkRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/works")
public class WorkController {

    private final WorkRepository repo;
    private final ResumeRepository resumeRepo;

    public WorkController(WorkRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
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
    public Work update(@PathVariable Long id, @RequestBody Work body) {
        Work existingWork = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Work not found"));

        // logic for partial updating
        if (body.getCompany() != null) existingWork.setCompany(body.getCompany());
        if (body.getJob_title() != null) existingWork.setJob_title(body.getJob_title());
        if (body.getLocationCity() != null) existingWork.setLocationCity(body.getLocationCity());
        if (body.getLocationState() != null) existingWork.setLocationState(body.getLocationState());
        if (body.getLocationCountry() != null) existingWork.setLocationCountry(body.getLocationCountry());
        if (body.getType() != null) existingWork.setType(body.getType());            // enum
        if (body.getStartDate() != null) existingWork.setStartDate(body.getStartDate());
        if (body.getEndDate() != null) existingWork.setEndDate(body.getEndDate());
        if (body.getIsCurrent() != null) existingWork.setIsCurrent(body.getIsCurrent());  // Boolean wrapper
        if (body.getSummary() != null) existingWork.setSummary(body.getSummary());

        // Logic to reattach parent resume
        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existingWork.setResume(existingResume);
        }

        return repo.save(existingWork);
    }

}
