package com.codecrafters.MealMate.model;

//import org.springframework.data.annotation.Id;
//import org.springframework.data.mongodb.core.mapping.Document;

//import java.time.LocalDateTime;

//@Document("supermarkets")

public class Supermarket {
    //@Id
    //private String id;

    private String name;
    private Double latitude;
    private Double longitude;

    public Supermarket(String name, Double latitude, Double longitude) {
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getName() {
        return name;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }
}
