package com.form.controller;

import com.form.dto.LoginRequest;
import com.form.dto.LoginResponse;
import com.form.security.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.*;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    private final AuthenticationManager authManager;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {

        Authentication auth = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        String role = auth.getAuthorities()
                .stream()
                .findFirst()
                .get()
                .getAuthority();

        String token = jwtUtil.generateToken(request.getUsername(), role);

        return ResponseEntity.ok(new LoginResponse(token, role));
    }
}
