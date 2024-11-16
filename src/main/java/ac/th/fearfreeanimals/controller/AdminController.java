package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.service.Adminservice;
import ac.th.fearfreeanimals.entity.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private Adminservice adminService;

    @PostMapping("/add-doctor")
    public ResponseEntity<User> addDoctor(@RequestParam String username, @RequestParam String password) {
        User doctor = adminService.createDoctor(username, password);
        return ResponseEntity.ok(doctor);
    }
}

