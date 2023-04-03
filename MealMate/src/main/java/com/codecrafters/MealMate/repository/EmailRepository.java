package com.codecrafters.MealMate.repository;

import com.codecrafters.MealMate.model.Feedback;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface EmailRepository extends MongoRepository<Feedback, Integer> {
}