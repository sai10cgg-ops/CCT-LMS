package com.form.controller;


import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.form.dto.RegistrationRequest;
import com.form.service.RegistrationService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
@RestController
@RequestMapping("/api/registrations")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class RegistrationController {

    private final RegistrationService service;
    private final ObjectMapper objectMapper;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(
            @RequestPart("data") String data,
            @RequestPart("photo") MultipartFile photo
    ) throws Exception {

        RegistrationRequest request =
                objectMapper.readValue(data, RegistrationRequest.class);

        return ResponseEntity.ok(service.saveRegistration(request, photo));
    }
}
