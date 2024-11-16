package ac.th.fearfreeanimals.service;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.entity.User;
import ac.th.fearfreeanimals.repository.GameProgressRepository;
import ac.th.fearfreeanimals.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameProgressService {

    @Autowired
    private GameProgressRepository gameProgressRepository;

    @Autowired
    private UserRepository userRepository;

    public GameProgress createGameProgress(Long userId, GameProgress newProgress) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with ID " + userId));
        newProgress.setUser(user);
        return gameProgressRepository.save(newProgress);
    }

    public GameProgress updateGameProgress(Long userId, GameProgress gameProgressDetails) {
        GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Game progress not found for user ID " + userId));

        gameProgress.setCurrentLevel(gameProgressDetails.getCurrentLevel());
        gameProgress.setAnimalType(gameProgressDetails.getAnimalType());
        gameProgress.setCompleted(gameProgressDetails.getCompleted());
        gameProgress.setDescription(gameProgressDetails.getDescription());
        return gameProgressRepository.save(gameProgress);
    }

    public GameProgress nextLevel(Long userId) {
        GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Game progress not found for user ID " + userId));

        int currentLevel = gameProgress.getCurrentLevel();
        gameProgress.setCurrentLevel(currentLevel + 1);

        if (currentLevel == 10) {
            // ไม่มีการเพิ่มเหรียญให้ผู้ป่วย
            User user = gameProgress.getUser();
            if (!user.getRole().getName().equals("PATIENT")) {
                user.setCoins(user.getCoins() + 1);
                userRepository.save(user);
            }
        }

        return gameProgressRepository.save(gameProgress);
    }

    public GameProgress getGameProgress(Long userId) {
        return gameProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Game progress not found for user ID " + userId));
    }
}
