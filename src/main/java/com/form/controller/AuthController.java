package com.form.controller;



import com.form.config.JwtUtil;
import com.form.entity.User;
import com.form.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin("http://localhost:5173")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User request) {

        return userRepository.findByUsername(request.getUsername())
            .filter(user ->
                passwordEncoder.matches(
                    request.getPassword(), user.getPassword()))
            .map(user -> ResponseEntity.ok(
                Map.of(
                    "token", jwtUtil.generateToken(user.getUsername()),
                    "role", user.getRole()
                )))
            .orElseGet(() -> ResponseEntity
            .status(HttpStatus.UNAUTHORIZED)
            .body(Map.of("error", "Invalid username or password")));
    }
}

