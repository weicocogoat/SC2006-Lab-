package com.codecrafters.MealMate.services;

import com.codecrafters.MealMate.model.Feedback;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class FeedbackEmailService {
    private final JavaMailSender mailSender;

    @Autowired
    public FeedbackEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendFeedbackEmail(Feedback feedback) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("codecrafters2006@gmail.com");
        message.setTo(feedback.getEmail(), "codecrafters2006@gmail.com");
        message.setSubject("New Feedback Received");
        message.setText("Name: " + feedback.getAuthor() + "\nEmail: " + feedback.getEmail() + "\nDate Sent: " + feedback.getDateSent() + "\nMessage: " + feedback.getMessage());

        mailSender.send(message);
    }
}

