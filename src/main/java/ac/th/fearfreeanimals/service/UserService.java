package ac.th.fearfreeanimals.service;

import ac.th.fearfreeanimals.entity.*;
import ac.th.fearfreeanimals.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public User createPatientByDoctor(String username, String password, Long doctorId) {
        // ค้นหา Role "PATIENT"
        Role patientRole = roleRepository.findByName("PATIENT")
                .orElseThrow(() -> new RuntimeException("Role PATIENT not found"));

        // ค้นหา Doctor
        User doctor = userRepository.findById(doctorId)
                .orElseThrow(() -> new RuntimeException("Doctor not found with ID: " + doctorId));
        if (!"DOCTOR".equals(doctor.getRole().getName())) {
            throw new RuntimeException("User with ID: " + doctorId + " is not a doctor");
        }

        // สร้างผู้ป่วยใหม่
        User patient = new User(username, password, patientRole);

        // สร้าง Access Code
        String accessCode = "FFANM" + String.format("%03d", (userRepository.countByRoleName("PATIENT") + 1));
        patient.setAccessCode(accessCode);

        // บันทึกในฐานข้อมูล
        return userRepository.save(patient);
    }
}

