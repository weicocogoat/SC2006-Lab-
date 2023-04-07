package com.codecrafters.MealMate.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "feedbacks")

public class Feedback {
    @Id
    private String email;
    private String author;
    private String message;
    private LocalDateTime dateSent;

    public Feedback() {
    }
    public Feedback(String email, String author, String message, LocalDateTime dateSent) {
        this.email = email;
        this.author = author;
        this.message = message;
        this.dateSent = dateSent;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public LocalDateTime getDateSent() {
        return dateSent;
    }

    public void setDateSent(LocalDateTime dateSent) {
        this.dateSent = dateSent;
    }
}
