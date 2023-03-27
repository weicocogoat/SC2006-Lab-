package com.codecrafters.MealMate.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Document("users")
public class User {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private String id;

    private String username;
    private String password;
    private String email;
    private int height;
    private int weight;
    private double bmi;
    private String[] recipeBookmarks;   // Just store the ID of Recipe

    public User(String id, String username, String password, String email, int height, int weight, double bmi, String[] recipeBookmarks) {
        this.id = id;
        this.username = username;

        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password).toString();

        //this.password = password;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.bmi = bmi;
        this.recipeBookmarks = recipeBookmarks;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        this.password = encoder.encode(password).toString();
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
}
