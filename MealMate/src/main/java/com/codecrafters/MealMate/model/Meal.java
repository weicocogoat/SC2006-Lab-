package com.codecrafters.MealMate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.codecrafters.MealMate.enums.MealType;

@Document("meals")
public class Meal {
    @Id
    private String id;

    private String name;
    private Float calories;
    private MealType mealType;

    public Meal(String id, String name, Float calories, MealType mealType){
        this.id = id;
        this.name = name;
        this.calories = calories;
        this.mealType = mealType;
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
}
