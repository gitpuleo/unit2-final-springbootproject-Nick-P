package com.nickpuleo.dynamic_cv.models;


import jakarta.persistence.*;
import jakarta.validation.constraints.Email;

@Entity
@Table
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String firstName;

    @Column(length = 100)
    private String lastName;

    @Email
    @Column(nullable = false, unique = true, length = 200)
    private String email;

    @Column(length = 50)
    private String phone;

    private String website;
    private String linkedin;
    private String headline;


}
