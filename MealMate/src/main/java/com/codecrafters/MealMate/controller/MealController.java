package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.model.Meal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/meal")
public class MealController {
    
    @Autowired
    private MealRepository mealRepo;

    @CrossOrigin
    @GetMApping("/all")
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
    @PostMapping("/save")
    public void saveMeal(@RequestBody Meal recipe)

    @CrossPrigin
    @DeleteMapping("delete/{id}")
    public void deleteMeal(@PathVariable String id)
    {
        mealRepo.deleteById(id);
    }
}
