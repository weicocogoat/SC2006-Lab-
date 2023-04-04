package com.codecrafters.MealMate.dto;

import java.time.LocalDate;

public class MealDateDTO {
    private String userId;
    private LocalDate mealDate;

    public MealDateDTO(String userId, LocalDate mealDate) {
        this.userId = userId;
        this.mealDate = mealDate;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public LocalDate getMealDate() {
        return mealDate;
    }

    public void setMealDate(LocalDate mealDate) {
        this.mealDate = mealDate;
    }
}
