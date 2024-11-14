package ac.th.fearfreeanimals.service;

import ac.th.fearfreeanimals.entity.User;
import ac.th.fearfreeanimals.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.UUID;

@Service
public class UserService {
    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String generateAccessCode(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        if (!"PATIENT".equalsIgnoreCase(user.getRole().getName())) {
            throw new IllegalArgumentException("Access code can only be generated for patients");
        }

        String accessCode = "FFANM" + String.format("%03d", userId);
        user.setAccessCode(accessCode);
        userRepository.save(user);
        return accessCode;
    }
}
