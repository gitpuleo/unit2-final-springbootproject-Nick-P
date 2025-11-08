package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.Education;
import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.repositories.EducationRepository;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/educations")
public class EducationController {

    private final EducationRepository repo;
    private final ResumeRepository resumeRepo;

    public EducationController(EducationRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
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
    public Education update(@PathVariable Long id, @RequestBody Education body) {
        Education existingEducation = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Education not found"));

        // Logic for partial updates
        if (body.getSchoolName() != null)        existingEducation.setSchoolName(body.getSchoolName());
        if (body.getDegree() != null)        existingEducation.setDegree(body.getDegree());
        if (body.getMajor() != null)        existingEducation.setMajor(body.getMajor());
        if (body.getMinor() != null)        existingEducation.setMinor(body.getMinor());
        if (body.getStartDate() != null)     existingEducation.setStartDate(body.getStartDate());
        if (body.getEndDate() != null)       existingEducation.setEndDate(body.getEndDate());
        if (body.getGpa() != null)           existingEducation.setGpa(body.getGpa());
        if (body.getLocationCity() != null)  existingEducation.setLocationCity(body.getLocationCity());
        if (body.getLocationState() != null) existingEducation.setLocationState(body.getLocationState());
        if (body.getLocationCountry() != null) existingEducation.setLocationCountry(body.getLocationCountry());


        // Logic for reattaching parent table
        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existingEducation.setResume(existingResume);
        }

        return repo.save(existingEducation);
    }

}
