package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.dto.MealDateDTO;
import com.codecrafters.MealMate.model.Meal;
import com.codecrafters.MealMate.repository.MealRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/meal")
public class MealController {
    
    @Autowired
    private MealRepository mealRepo;

    @CrossOrigin
    @GetMapping("/all")
    public List<Meal> getMeal()
    {
        return mealRepo.findAll();
    }

    @CrossOrigin
    @GetMapping("/find/{id}")
    public Optional<Meal> getMealById(@PathVariable String id)
    {
        return mealRepo.findById(id);
    }

    @CrossOrigin
    @GetMapping("/user/{id}")
    public List<Meal> getMealsByUser(@PathVariable String id) {
        return mealRepo.findByUserId(id);
    }

    @CrossOrigin
    @PostMapping("/find/mealDate")
    public List<Meal> getMealsByDate(@RequestBody MealDateDTO mealDateDTO) {
        return mealRepo.findByUserIdAndMealDate(mealDateDTO.getUserId(), mealDateDTO.getMealDate());
    }

    @CrossOrigin
    @PostMapping("/save")
    public void saveMeal(@RequestBody Meal recipe) {
        mealRepo.save(recipe);
    }

    @CrossOrigin
    @DeleteMapping("/delete/{id}")
    public void deleteMeal(@PathVariable String id)
    {
        mealRepo.deleteById(id);
    }
}
