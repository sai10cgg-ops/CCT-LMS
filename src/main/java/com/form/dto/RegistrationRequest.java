package com.form.dto;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class RegistrationRequest {

    @NotBlank
    private String officerType;

    @NotBlank
    private String officerId;

    @Size(min = 12, max = 12)
    private String aadhaar;

    @NotBlank
    private String title;

    @NotBlank
    private String name;

    @NotBlank
    private String fatherSpouse;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dob;

    @NotBlank
    private String gender;

    @NotBlank
    private String phone;

    @Email
    private String email;

    @NotBlank
    private String permanentAddress;

    @NotBlank
    private String presentAddress;

    @NotNull
    private LocalDate joiningDate;

    @NotBlank
    private String department;

    @NotBlank
    private String subDepartment;

    @NotBlank
    private String section;

    @NotBlank
    private String rank;

    private String deputation;

    @NotBlank
    private String role;

    private String postingDetails;
}

