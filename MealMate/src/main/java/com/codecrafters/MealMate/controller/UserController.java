package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.dto.UserDTO;
import com.codecrafters.MealMate.model.Recipe;
import com.codecrafters.MealMate.model.User;
import com.codecrafters.MealMate.repository.RecipeRepository;
import com.codecrafters.MealMate.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/{id}/bookmarks")
    public List<String> getBookmarks(@PathVariable String id) {
        User user = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        return user.getRecipeBookmarks();
    }

    @GetMapping("/{id}/bookmarks/{recipeId}")
    public Boolean containsBookmark(@PathVariable String id, @PathVariable String recipeId) {
        User user = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));

        return user.getRecipeBookmarks().contains(recipeId);
    }

    @PostMapping("/{id}/bookmarks/add/{recipeId}")
    public void addBookmark(@PathVariable String id, @PathVariable String recipeId) {
        User user = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.addBookmark(recipeId);
        userRepo.save(user);
    }

    @PostMapping("/{id}/bookmarks/remove/{recipeId}")
    public void removeBookmark(@PathVariable String id, @PathVariable String recipeId) {
        User user = userRepo.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
        user.removeBookmark(recipeId);
        userRepo.save(user);
    }
}
