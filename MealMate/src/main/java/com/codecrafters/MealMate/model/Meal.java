package com.codecrafters.MealMate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document("meals")
public class Meal {
    @Id
    private String id;

}
