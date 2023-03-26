package com.codecrafters.MealMate.model;

public class Ingredient {
    private String name;
    private int calories;
    private String image;
    private double quantity;
    private String quantityUnit;

    public Ingredient(String name, int calories, String image, double quantity, String quantityUnit) {
        this.name = name;
        this.calories = calories;
        this.image = image;
        this.quantity = quantity;
        this.quantityUnit = quantityUnit;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        this.calories = calories;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public double getQuantity() {
        return quantity;
    }

    public void setQuantity(double quantity) {
        this.quantity = quantity;
    }

    public String getQuantityUnit() {
        return quantityUnit;
    }

    public void setQuantityUnit(String quantityUnit) {
        this.quantityUnit = quantityUnit;
    }
}
