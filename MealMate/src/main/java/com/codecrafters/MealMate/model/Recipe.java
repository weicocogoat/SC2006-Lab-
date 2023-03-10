package com.codecrafters.MealMate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("recipes")
public class Recipe {
    @Id
    private String id;

    private String title;
    private String author;
    private String description;
    private LocalDateTime dateCreated;
    private int numOfBookmarks;
    private String preparationTime;
    private int portions;
    private int calories;
    private Ingredient[] ingredients;
    private String steps;

    public Recipe(String title, String author, String description, LocalDateTime dateCreated, int numOfBookmarks, String preparationTime, int portions, int calories, Ingredient[] ingredients, String steps) {
        this.title = title;
        this.author = author;
        this.description = description;
        this.dateCreated = dateCreated;
        this.numOfBookmarks = numOfBookmarks;
        this.preparationTime = preparationTime;
        this.portions = portions;
        this.calories = calories;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDateCreated() {
        return dateCreated;
    }

    public void setDateCreated(LocalDateTime dateCreated) {
        this.dateCreated = dateCreated;
    }

    public int getNumOfBookmarks() {
        return numOfBookmarks;
    }

    public void setNumOfBookmarks(int numOfBookmarks) {
        this.numOfBookmarks = numOfBookmarks;
    }

    public String getPreparationTime() {
        return preparationTime;
    }

    public void setPreparationTime(String preparationTime) {
        this.preparationTime = preparationTime;
    }

    public int getPortions() {
        return portions;
    }

    public void setPortions(int portions) {
        this.portions = portions;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public Ingredient[] getIngredients() {
        return ingredients;
    }

    public void setIngredients(Ingredient[] ingredients) {
        this.ingredients = ingredients;
    }

    public String getSteps() {
        return steps;
    }

    public void setSteps(String steps) {
        this.steps = steps;
    }
}
