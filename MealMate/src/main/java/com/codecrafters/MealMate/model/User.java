package com.codecrafters.MealMate.model;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;

@Document("users")
public class User implements UserDetails {
    @Id
    @JsonSerialize(using= ToStringSerializer.class)
    private String id;

    private String username;
    private String password;
    private String email;
    private int height;
    private int weight;
    private double bmi;
    private ArrayList<String> recipeBookmarks;  // store the ID of Recipe
    private LocalDate dateJoined;

    public User() {}

    public User(String username, String password, String email, int height, int weight, double bmi, ArrayList<String> recipeBookmarks, LocalDate dateJoined) {
        this.username = username;
        this.password = password;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.bmi = ((double) this.weight / (double) this.height / (double) this.height) * 10000;
        this.recipeBookmarks = recipeBookmarks;
        this.dateJoined = dateJoined;
    }

    public User(String id, String username, String password, String email, int height, int weight, double bmi, ArrayList<String> recipeBookmarks, LocalDate dateJoined) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.height = height;
        this.weight = weight;
        this.bmi = ((double) this.weight / (double) this.height / (double) this.height) * 10000;
        this.recipeBookmarks = recipeBookmarks;
        this.dateJoined = dateJoined;
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

    public double getBmi() {
        //return bmi;

        return ((double) this.weight / (double) this.height / (double) this.height) * 10000;
    }

    public void setBmi() {
        this.bmi = ((double) this.weight / (double) this.height / (double) this.height) * 10000;
    }

    public ArrayList<String> getRecipeBookmarks() {
        return recipeBookmarks;
    }

    public void setRecipeBookmarks(ArrayList<String> recipeBookmarks) {
        this.recipeBookmarks = recipeBookmarks;
    }

    public void addBookmark(String recipeId) {
        this.recipeBookmarks.add(recipeId);
    }

    public void removeBookmark(String recipeId) {
        this.recipeBookmarks.remove(recipeId);
    }

    public LocalDate getDateJoined() {
        return dateJoined;
    }

    public void setDateJoined(LocalDate dateJoined) {
        this.dateJoined = dateJoined;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.EMPTY_LIST;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
