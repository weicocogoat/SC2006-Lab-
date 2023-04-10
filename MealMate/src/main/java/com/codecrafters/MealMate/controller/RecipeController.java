package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.model.Recipe;
import com.codecrafters.MealMate.repository.RecipeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepo;

    @CrossOrigin
    @GetMapping("/all")
    public List<Recipe> getRecipes()
    {
        return recipeRepo.findAll();
    }

    @CrossOrigin
    @GetMapping("/find/{id}")
    public Optional<Recipe> getRecipeById(@PathVariable String id)
    {
        return recipeRepo.findById(id);
    }

    @CrossOrigin
    @GetMapping("/all/sort/bookmarks")
    public List<Recipe> getRecipesByBookmarks() {
        return recipeRepo.findAll(Sort.by(Sort.Direction.DESC, "numOfBookmarks"));
    }

    @CrossOrigin
    @GetMapping("/user/{id}")
    public List<Recipe> getRecipesByUser(@PathVariable String id)
    {
        return recipeRepo.findByAuthor(id);
    }

    @CrossOrigin
    @PostMapping("/save")
    public void saveRecipe(@RequestBody Recipe recipe) {
        recipeRepo.save(recipe);
        System.out.println("Recipe successfully saved");
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void deleteRecipe(@PathVariable String id)
    {
        recipeRepo.deleteById(id);
    }
}
