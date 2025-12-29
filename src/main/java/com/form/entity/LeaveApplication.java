package com.form.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "leave_applications")
public class LeaveApplication {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String leaveType;
    private String leaveDays;
    private String fromDate;
    private String fromSession;
    private String toDate;
    private String toSession;
    private String purpose;
    private String purposeOfLeave;
    private String contactAddress;
    private String contactNo;
    private String leavingHeadquaters;
    private String visitingPlace;
}

