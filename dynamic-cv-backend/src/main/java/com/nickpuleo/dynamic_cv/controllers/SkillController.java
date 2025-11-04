package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Skill;
import com.nickpuleo.dynamic_cv.repositories.SkillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("/skill")
public class SkillController {

    private final SkillRepository skillRepository;

    public SkillController(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }

@PostMapping
public List<Skill> getAllSkills() {
        return skillRepository.findAll();
}

@GetMapping("/{id}")
    public Skill getSkillById(@PathVariable Long id) {
        return skillRepository.findById(id).orElseThrow(() -> new RuntimeException("Error retrieving data"));
    }

//@PutMapping("/{id}")
    //public Skill
}

@DeleteMapping("/{id}")
    public void deleteSkill(@PathVariable Long id) {
        skillRepository.deleteById(id);
    }
}


