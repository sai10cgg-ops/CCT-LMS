package com.form.service;

import com.form.dto.RegistrationRequest;
import com.form.entity.ReactRegistration;
import com.form.repository.RegistrationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@Service
@RequiredArgsConstructor
public class RegistrationService {

    private final RegistrationRepository repository;

    private static final String UPLOAD_DIR = "uploads/";

    public ReactRegistration saveRegistration(
            RegistrationRequest request,
            MultipartFile photo
    ) throws Exception {

        if (repository.existsByOfficerId(request.getOfficerId())) {
            throw new RuntimeException("Officer ID already exists");
        }

        // Create upload directory if not exists
        Files.createDirectories(Paths.get(UPLOAD_DIR));

        String filePath = UPLOAD_DIR
                + System.currentTimeMillis()
                + "_"
                + photo.getOriginalFilename();

        Files.write(Path.of(filePath), photo.getBytes());

        ReactRegistration registration = ReactRegistration.builder()
                .officerType(request.getOfficerType())
                .officerId(request.getOfficerId())
                .aadhaar(request.getAadhaar())
                .title(request.getTitle())
                .name(request.getName())
                .fatherSpouse(request.getFatherSpouse())
                .dob(request.getDob())
                .gender(request.getGender())
                .phone(request.getPhone())
                .email(request.getEmail())
                .permanentAddress(request.getPermanentAddress())
                .presentAddress(request.getPresentAddress())
                .joiningDate(request.getJoiningDate())
                .department(request.getDepartment())
                .subDepartment(request.getSubDepartment())
                .section(request.getSection())
                .rank(request.getRank())
                .deputation(request.getDeputation())
                .role(request.getRole())
                .postingDetails(request.getPostingDetails())
                .photoPath(filePath)
                .build();

        return repository.save(registration);
    }
}

