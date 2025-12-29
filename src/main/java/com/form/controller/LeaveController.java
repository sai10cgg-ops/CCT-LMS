package com.form.controller;

import com.form.entity.LeaveApplication;
import com.form.service.LeaveService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(
    origins = "http://localhost:5173",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE}
)
@RestController
@RequestMapping("/api/leaves")
public class LeaveController {

    @Autowired
    private LeaveService leaveService;

    @PostMapping("/apply")
    public LeaveApplication applyLeave(@RequestBody LeaveApplication leaveApplication) {
        return leaveService.saveLeave(leaveApplication);
    }

    @GetMapping("/all")
    public List<LeaveApplication> getAllLeaves() {
        return leaveService.getAllLeaves();
    }
}

