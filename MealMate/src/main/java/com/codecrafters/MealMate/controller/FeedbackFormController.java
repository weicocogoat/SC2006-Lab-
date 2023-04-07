package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.model.Feedback;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class FeedbackFormController {

    @GetMapping("/feedbackform")
    public String showFeedbackForm(Model model) {
        model.addAttribute("feedback", new Feedback());
        return "feedbackform";
    }

}
