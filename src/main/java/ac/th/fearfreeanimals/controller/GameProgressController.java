package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.GameProgress;

import ac.th.fearfreeanimals.repository.GameProgressRepository;
import ac.th.fearfreeanimals.repository.UserRepository;
import ac.th.fearfreeanimals.service.GameProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game-progress")
public class GameProgressController {
    // ตรวจสอบ userId


    private final GameProgressRepository gameProgressRepository;
    private final GameProgressService gameProgressService;
    private final UserRepository userRepository;
    private void validateUserId(Long userId) {
    if (!userRepository.existsById(userId)) {
        throw new RuntimeException("User with ID " + userId + " does not exist.");
    }
}

    @Autowired
    public GameProgressController(GameProgressService gameProgressService, 
                                  GameProgressRepository gameProgressRepository, 
                                  UserRepository userRepository) {
        this.gameProgressService = gameProgressService;
        this.gameProgressRepository = gameProgressRepository;
        this.userRepository = userRepository; // ประกาศตัวแปร userRepository
    }

    // Get game progress by userId
    @GetMapping("/{userId}")
    public ResponseEntity<GameProgress> getGameProgress(@PathVariable Long userId) {
        // Find game progress by userId
        GameProgress gameProgress = gameProgressService.getGameProgress(userId);
        return ResponseEntity.ok(gameProgress);
    }

    // Create or update game progress
    @PostMapping("/{userId}")
public ResponseEntity<GameProgress> createGameProgress(@PathVariable Long userId, @RequestBody GameProgress newProgress) {
    validateUserId(userId);
    newProgress.setUser(userRepository.findById(userId).orElseThrow());
    GameProgress createdProgress = gameProgressRepository.save(newProgress);
    return ResponseEntity.ok(createdProgress);
}

@PutMapping("/{userId}")
public ResponseEntity<GameProgress> updateGameProgress(@PathVariable Long userId, @RequestBody GameProgress gameProgressDetails) {
    validateUserId(userId);
    GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Game progress not found with userId " + userId));

    // Update properties
    gameProgress.setCurrentLevel(gameProgressDetails.getCurrentLevel());
    gameProgress.setAnimalType(gameProgressDetails.getAnimalType());
    gameProgress.setCompleted(gameProgressDetails.isCompleted());

    // Save updated progress
    GameProgress updatedProgress = gameProgressRepository.save(gameProgress);
    return ResponseEntity.ok(updatedProgress);
}

}
