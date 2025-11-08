package com.nickpuleo.dynamic_cv.controllers;

import java.util.List;
import com.nickpuleo.dynamic_cv.models.Resume;
import com.nickpuleo.dynamic_cv.models.User;
import com.nickpuleo.dynamic_cv.repositories.ResumeRepository;
import com.nickpuleo.dynamic_cv.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;


@RestController
@RequestMapping("/resumes")
public class ResumeController {

    private final ResumeRepository repo;
    private final UserRepository userRepo;

    public ResumeController(ResumeRepository repo, UserRepository userRepo) {
        this.repo = repo;
        this.userRepo = userRepo;
    }

@GetMapping
public List<Resume> getAll() {
        return repo.findAll();
}

@GetMapping("/{id}")
    public Resume getOne(@PathVariable Long id) {
        return repo.findById(id).orElseThrow(() -> new org.springframework.web.server.ResponseStatusException(
            org.springframework.http.HttpStatus.NOT_FOUND, "Data not found"));
}

@PostMapping
    public Resume create(@RequestBody Resume body) {
    if (body.getUser() != null && body.getUser().getId() != null) {
        User existingUser = userRepo.findById(body.getUser().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "User not found"));
        body.setUser(existingUser);
    }
        return repo.save(body);
}

@DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
    if (!repo.existsById(id)) {
        throw new org.springframework.web.server.ResponseStatusException(HttpStatus.NOT_FOUND, "Entry not found");
    } repo.deleteById(id);
}

}



