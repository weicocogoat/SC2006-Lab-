package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.model.Recipe;
import com.codecrafters.MealMate.repository.RecipeRepository;
import com.codecrafters.MealMate.services.RecipeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/recipes")
public class RecipeController {

    @Autowired
    private RecipeRepository recipeRepo;

    /*
    final RecipeService recipeService;

    public RecipeController(@Autowired RecipeService recipeService) {
        this.recipeService = recipeService;
    }
     */

    @CrossOrigin
    @GetMapping("/all")
    public List<Recipe> getRecipes()
    {
        return recipeRepo.findAll();
    }

    /*
    @CrossOrigin
    @GetMapping("/{id}")
    public Recipe getRecipeById(@PathVariable String id)
    {
        return recipeRepo.findById(id);
    }
     */

    @CrossOrigin
    @PostMapping("/add")
    public void saveRecipe(@RequestBody Recipe recipe) {
        recipeRepo.save(recipe);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void deleteRecipe(@PathVariable String id)
    {
        recipeRepo.deleteById(id);
    }
}
