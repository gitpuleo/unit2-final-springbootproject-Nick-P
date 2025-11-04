package com.nickpuleo.dynamic_cv.controllers;

import com.nickpuleo.dynamic_cv.models.Skill;
import com.nickpuleo.dynamic_cv.repositories.SkillRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;


@RestController
@RequestMapping("/skill")
public class SkillController {

    private final SkillRepository repo;


    // GET http://localhost:8080/api/skill
    @GetMapping("")
    public Collection<Skill> getAllSkills() {
        return lll.getAll();
    }


    //POST
    @PostMapping("/addskill")


}
