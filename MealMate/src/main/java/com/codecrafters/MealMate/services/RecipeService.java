package com.codecrafters.MealMate.services;

import com.codecrafters.MealMate.model.Recipe;

import java.util.List;

// currently not in use, tbc if should implement

public interface RecipeService {
    void saveRecipe(Recipe recipe);     // can be used for add and edit
    List<Recipe> getRecipes();
    Recipe getRecipeById(String id);
    void deleteRecipe(String id);
}
