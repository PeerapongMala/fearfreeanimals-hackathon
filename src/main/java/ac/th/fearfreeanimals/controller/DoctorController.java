package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.Username;
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

    @PostMapping("/generateCode/{userId}")
    public ResponseEntity<String> generateAccessCode(@PathVariable Long userId) {
        Username user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("ไม่พบผู้ใช้"));

        // ตรวจสอบว่าเป็นผู้ป่วยหรือไม่
        if (!user.getRole().getName().equals("PATIENT")) {
            return ResponseEntity.badRequest().body("สามารถสร้างโค้ดได้เฉพาะผู้ป่วยเท่านั้น");
        }

        // หา Access Code ลำดับล่าสุดจากฐานข้อมูล
        String prefix = "FFANM";
        long nextSequence = userRepository.countByRoleName("PATIENT") + 1; // ลำดับถัดไป
        String accessCode = String.format("%s%03d", prefix, nextSequence); // FFANM001, FFANM002, ...

        // บันทึก Access Code ลงในผู้ป่วย
        user.setAccessCode(accessCode);
        userRepository.save(user);

        return ResponseEntity.ok(accessCode);
    }
}
