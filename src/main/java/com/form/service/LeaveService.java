package com.form.service;



import com.form.entity.LeaveApplication;
import com.form.repository.LeaveRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LeaveService {

    @Autowired
    private LeaveRepository leaveRepository;

    public LeaveApplication saveLeave(LeaveApplication leaveApplication) {
        return leaveRepository.save(leaveApplication);
    }

    public List<LeaveApplication> getAllLeaves() {
        return leaveRepository.findAll();
    }
}

