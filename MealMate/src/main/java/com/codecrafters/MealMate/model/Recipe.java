package com.codecrafters.MealMate.model;

import com.codecrafters.MealMate.enums.MealType;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document("recipes")
public class Recipe {
    @Id
    @JsonSerialize(using=ToStringSerializer.class)      // https://stackoverflow.com/questions/9065042/java-spring-mappingjacksonjsonview-not-doing-tostring-on-mongodb-objectid
    private String id;

    private String title;
    private String author;
    private String description;
    private LocalDateTime dateCreated;
    private MealType mealType;
    private String[] dietType;
    private int numOfBookmarks;
    private String prepTime;
    private int servingSize;
    private int calories;
    private Ingredient[] ingredients;
    private RecipeStep[] steps;

    public Recipe(String id, String title, String author, String description, LocalDateTime dateCreated, MealType mealType, String[] dietType, int numOfBookmarks, String prepTime, int servingSize, int calories, Ingredient[] ingredients, RecipeStep[] steps) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.description = description;
        this.dateCreated = dateCreated;
        this.mealType = mealType;
        this.dietType = dietType;
        this.numOfBookmarks = numOfBookmarks;
        this.prepTime = prepTime;
        this.servingSize = servingSize;
        this.calories = calories;
        this.ingredients = ingredients;
        this.steps = steps;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
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

    public MealType getMealType() {
        return mealType;
    }

    public void setMealType(MealType mealType) {
        this.mealType = mealType;
    }

    public String[] getDietType() {
        return dietType;
    }

    public void setDietType(String[] dietType) {
        this.dietType = dietType;
    }

    public int getNumOfBookmarks() {
        return numOfBookmarks;
    }

    public void setNumOfBookmarks(int numOfBookmarks) {
        this.numOfBookmarks = numOfBookmarks;
    }

    public String getPrepTime() {
        return prepTime;
    }

    public void setPrepTime(String prepTime) {
        this.prepTime = prepTime;
    }

    public int getServingSize() {
        return servingSize;
    }

    public void setServingSize(int servingSize) {
        this.servingSize = servingSize;
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

    public RecipeStep[] getSteps() {
        return steps;
    }

    public void setSteps(RecipeStep[] steps) {
        this.steps = steps;
    }
}
