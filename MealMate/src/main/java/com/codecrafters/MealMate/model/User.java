package com.codecrafters.MealMate.model;

import org.springframework.data.annotation.Id;

public class User {
    @Id
    private String id;

    private String username;
    private String password;
    private String email;
    private int height;
    private int weight;

    public User(String id, String username, String password, String email, int height, int weight) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.height = height;
        this.weight = weight;
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
}
