package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.models.Skill;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import com.nickpuleo.dynamic_cv.repositories.SkillRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;


@RestController
@RequestMapping("/skills")
public class SkillController {

    private final SkillRepository repo;
    private final ResumeRepository resumeRepo;

    public SkillController(SkillRepository repo, ResumeRepository resumeRepo) {
        this.repo = repo;
        this.resumeRepo = resumeRepo;
    }


@GetMapping
public List<Skill> getAll() {
        return repo.findAll();
}

@GetMapping("/{id}")
    public Skill getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
                org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
    }

@PostMapping
public Skill create(@RequestBody Skill body) {
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
    public Skill update(@PathVariable Long id, @RequestBody Skill body) {
        Skill existingSkill = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Skill not found"));

        if (body.getSkillName() != null) existingSkill.setSkillName(body.getSkillName());
        if (body.getLevel() != null)     existingSkill.setLevel(body.getLevel());
        if (body.getNotes() != null)     existingSkill.setNotes(body.getNotes());

        if (body.getResume() != null && body.getResume().getId() != null) {
            Resume existingResume = resumeRepo.findById(body.getResume().getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Resume not found"));
            existingSkill.setResume(existingResume);
        }

        return repo.save(existingSkill);
    }


}





