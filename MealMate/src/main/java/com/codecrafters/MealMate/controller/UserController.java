package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.dto.UserDTO;
import com.codecrafters.MealMate.model.User;
import com.codecrafters.MealMate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
public class UserController {
    @Autowired
    UserRepository userRepo;

    @GetMapping("/{id}")
    @PreAuthorize("#user.id == #id")
    public ResponseEntity user(@AuthenticationPrincipal User user, @PathVariable String id) {
        User eUser = userRepo.findById(id).orElseThrow();
        UserDTO userDTO = new UserDTO(eUser);

        return ResponseEntity.ok(userDTO);
    }
}
