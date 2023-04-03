package com.codecrafters.MealMate.repository;

import com.codecrafters.MealMate.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MealRepository extends MongoRepository<Meal, String> {
    List<Meal> findByUserId(String userId);
}

