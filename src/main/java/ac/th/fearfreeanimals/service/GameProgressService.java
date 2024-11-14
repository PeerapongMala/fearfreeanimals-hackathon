package ac.th.fearfreeanimals.service;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.entity.User;
import ac.th.fearfreeanimals.repository.GameProgressRepository;
import ac.th.fearfreeanimals.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class GameProgressService {

    private final GameProgressRepository gameProgressRepository;
    private final UserRepository userRepository;

    @Autowired
    public GameProgressService(GameProgressRepository gameProgressRepository, UserRepository userRepository) {
        this.gameProgressRepository = gameProgressRepository;
        this.userRepository = userRepository;
    }

    // Update or create game progress for the user
    public GameProgress updateProgress(Long userId, int currentLevel) {
        // Find the user by userId
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        // Get the existing game progress or create a new one
        GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
                .orElseGet(() -> {
                    GameProgress newProgress = new GameProgress(user);
                    newProgress.setCurrentLevel(1);  // Default starting level
                    newProgress.setCompleted(false);  // Set default completed status
                    return newProgress;
                });

        // Update current level
        gameProgress.setCurrentLevel(currentLevel);

        // If the user reaches level 10, give 1 coin
        if (currentLevel == 10) {
            user.setCoins(user.getCoins() + 1);  // Add 1 coin
        }

        // Save updated game progress and user
        gameProgressRepository.save(gameProgress);
        userRepository.save(user);

        return gameProgress;
    }
    // Get game progress by userId
    public GameProgress getGameProgress(Long userId) {
        return gameProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Game progress not found for userId " + userId));
    }
}
