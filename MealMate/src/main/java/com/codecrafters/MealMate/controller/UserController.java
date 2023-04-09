package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.dto.UserDTO;
import com.codecrafters.MealMate.model.User;
import com.codecrafters.MealMate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepo;

    @GetMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity user(@AuthenticationPrincipal User user, @PathVariable String id) {
        User eUser = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        UserDTO userDTO = new UserDTO(eUser);

        return ResponseEntity.ok(userDTO);
    }

    @GetMapping("/username/{id}")
    public String username(@PathVariable String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user.getUsername();
    }

    @PostMapping("/save/{id}")
    public void updateUser(@PathVariable String id, @RequestBody User user) {
        User userToFind = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        userToFind.setUsername(user.getUsername());
        userToFind.setHeight(user.getHeight());
        userToFind.setWeight(user.getWeight());
        userToFind.setBmi();

        userRepo.save(userToFind);
    }

    @PostMapping("/add/bookmark/{id}")
    public void addBookmark(@PathVariable String id, @RequestBody String recipeId) {
        User user = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.addBookmark(recipeId);
        userRepo.save(user);
    }
}
