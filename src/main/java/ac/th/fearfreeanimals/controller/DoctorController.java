package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.User;
import ac.th.fearfreeanimals.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/doctors")
public class DoctorController {

    private final UserRepository userRepository;

    @Autowired
    public DoctorController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Generate Access Code for Patients
    @PostMapping("/generateCode/{userId}")
    public ResponseEntity<String> generateAccessCode(@PathVariable Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        if (!"PATIENT".equals(user.getRole().getName())) {
            return ResponseEntity.badRequest().body("Access codes can only be generated for patients");
        }

        String accessCode = "FFANM" + String.format("%03d", userId);
        user.setAccessCode(accessCode);
        userRepository.save(user);

        return ResponseEntity.ok(accessCode);
    }
}
