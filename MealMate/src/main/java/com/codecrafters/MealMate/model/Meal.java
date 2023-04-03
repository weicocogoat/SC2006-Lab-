package com.codecrafters.MealMate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.codecrafters.MealMate.enums.MealType;

import java.time.LocalDate;

@Document("meals")
public class Meal {
    @Id
    private String id;

    private String userId;
    private String name;
    private Float calories;
    private MealType mealType;
    private LocalDate mealDate;

    public Meal(String id, String userId, String name, Float calories, MealType mealType, LocalDate mealDate){
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.calories = calories;
        this.mealType = mealType;
        this.mealDate = mealDate;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public void setName(String name){
        this.name = name;
    }

    public String getName(){
        return this.name;
    }

    public void setCalories(Float calories){
        this.calories = calories;
    }

    public Float getCalories(){
        return this.calories;
    }

    public void setMealType(MealType type){
        this.mealType = type;
    }

    public MealType getMealType(){
        return this.mealType;
    }

    public LocalDate getMealDate() {
        return mealDate;
    }

    public void setMealDate(LocalDate mealDate) {
        this.mealDate = mealDate;
    }
}
