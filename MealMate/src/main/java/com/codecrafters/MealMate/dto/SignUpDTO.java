package com.codecrafters.MealMate.dto;

public class SignUpDTO {
    private String username;
    private String password;
    private String email;
    private int height;
    private int weight;
    private double bmi;
    private String[] recipeBookmarks;   // Just store the ID of Recipe

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public int getHeight() {
        return height;
    }

    public void setHeight(int height) {
        this.height = height;
    }

    public int getWeight() {
        return weight;
    }

    public void setWeight(int weight) {
        this.weight = weight;
    }

    public double getBmi() {
        return bmi;
    }

    public void setBmi(double bmi) {
        this.bmi = (this.weight / this.height / this.height) * 10000;
    }

    public String[] getRecipeBookmarks() {
        return recipeBookmarks;
    }

    public void setRecipeBookmarks(String[] recipeBookmarks) {
        this.recipeBookmarks = recipeBookmarks;
    }
}
