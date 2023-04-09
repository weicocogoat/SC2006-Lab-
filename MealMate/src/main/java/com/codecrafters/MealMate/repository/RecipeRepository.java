package com.codecrafters.MealMate.repository;

import com.codecrafters.MealMate.model.Recipe;
import com.codecrafters.MealMate.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/*
    We extend MongoRepository<T, ID> where
    T: Domain type for repository to manage (i.e. Some Entity/Class)
    ID: Type of the Entity/Class ID (i.e. referring to the @Id attribute)

 */

@Repository
public interface RecipeRepository extends MongoRepository<Recipe, String> {
    List<Recipe> findByAuthor(String userId);
}
