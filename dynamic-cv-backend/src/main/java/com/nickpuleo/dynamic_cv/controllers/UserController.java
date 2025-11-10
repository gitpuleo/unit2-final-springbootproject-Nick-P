package com.nickpuleo.dynamic_cv.controllers;


import com.nickpuleo.dynamic_cv.models.User;
import com.nickpuleo.dynamic_cv.repositories.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserRepository repo;
    public UserController(UserRepository repo) {
        this.repo = repo;
    }

@GetMapping("/{id}")
public User getOne(@PathVariable Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Data not found"));
}

}
