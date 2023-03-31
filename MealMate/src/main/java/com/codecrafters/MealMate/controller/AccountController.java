package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.model.User;
import com.codecrafters.MealMate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
public class AccountController {

    @Autowired
    private UserRepository userRepo;

    @CrossOrigin
    @GetMapping("/login")
    public void login(@RequestBody User user) {

    }

    @CrossOrigin
    @PostMapping("/register")
    public void register(@RequestBody User user) {
        userRepo.save(user);
    }
}
