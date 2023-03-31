package com.codecrafters.MealMate.repository;

import com.codecrafters.MealMate.model.Meal;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository; 

@Repository
public interface MealRepository extends MangoRepository<Recipe, String> {
    
}
