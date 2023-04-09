package com.codecrafters.MealMate.dto;

import java.time.LocalDate;
import java.util.ArrayList;

public class SignUpDTO {
    private String username;
    private String password;
    private String email;
    private int height;
    private int weight;
    private double bmi;
    private ArrayList<String> recipeBookmarks;   // Just store the ID of Recipe
    private LocalDate dateJoined;

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
        this.bmi = ((double) this.weight / (double) this.height / (double) this.height) * 10000;
    }

    public ArrayList<String> getRecipeBookmarks() {
        return recipeBookmarks;
    }

    public void setRecipeBookmarks(ArrayList<String> recipeBookmarks) {
        this.recipeBookmarks = recipeBookmarks;
    }

    public LocalDate getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(LocalDate dateJoined) {
        this.dateJoined = dateJoined;
    }
}
