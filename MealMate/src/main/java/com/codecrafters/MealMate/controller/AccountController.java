package com.codecrafters.MealMate.controller;

import com.codecrafters.MealMate.dto.LoginDTO;
import com.codecrafters.MealMate.dto.SignUpDTO;
import com.codecrafters.MealMate.dto.TokenDTO;
import com.codecrafters.MealMate.model.User;
import com.codecrafters.MealMate.repository.UserRepository;
import com.codecrafters.MealMate.security.TokenGenerator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationProvider;
import org.springframework.security.provisioning.UserDetailsManager;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

@RestController
@RequestMapping("/users")
public class AccountController {

    @Autowired
    private UserRepository userRepo;

    @Autowired
    UserDetailsManager userDetailsManager;

    @Autowired
    TokenGenerator tokenGenerator;

    @Autowired
    DaoAuthenticationProvider daoAuthenticationProvider;

    @Autowired
    @Qualifier("jwtRefreshTokenAuthProvider")
    JwtAuthenticationProvider refreshTokenAuthProvider;

    @CrossOrigin
    @PostMapping("/login")
    public ResponseEntity login(@RequestBody LoginDTO loginDTO) {
        Authentication authentication = daoAuthenticationProvider.authenticate(UsernamePasswordAuthenticationToken.unauthenticated(loginDTO.getUsername(), loginDTO.getPassword()));

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @CrossOrigin
    @PostMapping("/register")
    //public void register(@RequestBody User user) {
    public ResponseEntity register(@RequestBody SignUpDTO signUpDTO) {
        //userRepo.save(user);
        User user = new User(signUpDTO.getUsername(), signUpDTO.getPassword(), signUpDTO.getEmail(), signUpDTO.getHeight(), signUpDTO.getWeight(), signUpDTO.getBmi(), signUpDTO.getRecipeBookmarks());
        userDetailsManager.createUser(user);

        Authentication authentication = UsernamePasswordAuthenticationToken.authenticated(user, signUpDTO.getPassword(), Collections.EMPTY_LIST);

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }

    @PostMapping("/token")
    public ResponseEntity token(@RequestBody TokenDTO tokenDTO) {
        Authentication authentication = refreshTokenAuthProvider.authenticate(new BearerTokenAuthenticationToken(tokenDTO.getRefreshToken()));

        return ResponseEntity.ok(tokenGenerator.createToken(authentication));
    }
}
