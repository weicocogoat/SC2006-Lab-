package com.codecrafters.MealMate.dto;

import com.codecrafters.MealMate.model.User;

public class UserDTO {
    private String id;
    private String username;
    private String email;
    private int height;
    private int weight;
    private double bmi;
    private String[] recipeBookmarks;

    public UserDTO(User user) {
        this.id = user.getId();
        this.username = user.getUsername();
        this.email = user.getEmail();
        this.height = user.getHeight();
        this.weight = user.getWeight();
        this.bmi = user.getBmi();
        this.recipeBookmarks = user.getRecipeBookmarks();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
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
        this.bmi = bmi;
    }

    public String[] getRecipeBookmarks() {
        return recipeBookmarks;
    }

    public void setRecipeBookmarks(String[] recipeBookmarks) {
        this.recipeBookmarks = recipeBookmarks;
    }

    /*
    public static UserDTO from(User user) {
        return UserDTO.builder()
                .id(user.getId())
                .username(user.getUsername())
                .email(user.getEmail())
                .height(user.getHeight())
                .weight(user.getWeight())
                .bmi(user.getBmi())
                .recipeBookmarks(user.getRecipeBookmarks())
                .build();
    }

     */
}
