package com.form.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "react_registration")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReactRegistration {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String officerType;
    private String officerId;

    @Column(length = 12)
    private String aadhaar;

    private String title;
    private String name;
    private String fatherSpouse;

    private LocalDate dob;
    private String gender;
    private String phone;
    private String email;

    @Column(columnDefinition = "TEXT")
    private String permanentAddress;

    @Column(columnDefinition = "TEXT")
    private String presentAddress;

    private LocalDate joiningDate;

    private String department;
    private String subDepartment;
    private String section;
    private String rank;
    private String deputation;
    private String role;
    private String postingDetails;

    // store uploaded photo path
    private String photoPath;
}

