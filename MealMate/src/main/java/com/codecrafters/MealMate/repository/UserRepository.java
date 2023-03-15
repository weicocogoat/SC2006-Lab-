package com.codecrafters.MealMate.repository;

import com.codecrafters.MealMate.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;

/*
    We extend MongoRepository<T, ID> where
    T: Domain type for repository to manage (i.e. Some Entity/Class)
    ID: Type of the Entity/Class ID (i.e. referring to the @Id attribute)

 */

public interface UserRepository extends MongoRepository<User, String> {
    User findByEmail(String email);
}
