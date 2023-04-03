package com.codecrafters.MealMate.resource;

import com.codecrafters.MealMate.FormBody;
import com.codecrafters.MealMate.model.Feedback;
import com.codecrafters.MealMate.repository.EmailRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/rest/Feedback")

public class EmailsResource {

    private EmailRepository emailRepository;

    public EmailsResource(EmailRepository emailRepository) {
        this.emailRepository = emailRepository;
    }

    @PostMapping("/all")
    public List<Feedback> postAll() {
        return emailRepository.findAll();
    }

    @PostMapping("/register")
    public List<com.codecrafters.MealMate.model.Feedback> register(@RequestBody
                                                                        FormBody body){




        emailRepository.save(new Feedback(body.email, body.author, body.message, body.dateSent));
        return emailRepository.findAll();
    }
}
