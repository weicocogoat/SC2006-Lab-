package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.model.Feedback;
import com.codecrafters.MealMate.repository.FeedbackRepository;
import com.codecrafters.MealMate.services.FeedbackEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.validation.Valid;

@Controller
public class FeedbackController {
    private final FeedbackEmailService feedbackEmailService;
    private final FeedbackRepository feedbackRepository;

    @Autowired
    public FeedbackController(FeedbackEmailService feedbackEmailService, FeedbackRepository feedbackRepository) {
        this.feedbackEmailService = feedbackEmailService;
        this.feedbackRepository = feedbackRepository;
    }

    @GetMapping("/feedback")
    public String showFeedbackForm(Model model) {
        model.addAttribute("feedback", new Feedback());
        return "feedback";
    }

    @PostMapping("/feedback")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            return ResponseEntity.badRequest().body("Please fill in all required fields.");
        }

        feedbackRepository.save(feedback);
        feedbackEmailService.sendFeedbackEmail(feedback);

        return ResponseEntity.ok().body("Thank you for your feedback!");
    }
}



