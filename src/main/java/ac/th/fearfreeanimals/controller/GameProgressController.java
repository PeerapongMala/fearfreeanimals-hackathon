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
    private final GameProgressRepository gameProgressRepository;  
    private final GameProgressService gameProgressService;
    private final UserRepository userRepository;
    @Autowired
    public GameProgressController(GameProgressService gameProgressService, 
                                  GameProgressRepository gameProgressRepository, 
                                  UserRepository userRepository) {
        this.gameProgressService = gameProgressService;
        this.gameProgressRepository = gameProgressRepository; // กำหนดค่าให้กับ gameProgressRepository
        this.userRepository = userRepository;
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
    public ResponseEntity<GameProgress> updateGameProgress(@PathVariable Long userId, @RequestParam int currentLevel) {
        // Update or create game progress
        GameProgress updatedProgress = gameProgressService.updateProgress(userId, currentLevel);
        return ResponseEntity.ok(updatedProgress);
    }
    @PutMapping("/{userId}")
public ResponseEntity<GameProgress> updateGameProgress(
        @PathVariable Long userId,
        @RequestBody GameProgress gameProgressDetails) {  // รับข้อมูลที่ถูกส่งมาใน body

    // ค้นหาผู้ใช้จาก userId
    GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Game progress not found with userId " + userId));

    // อัพเดทข้อมูลตามที่ได้รับจาก body
    gameProgress.setCurrentLevel(gameProgressDetails.getCurrentLevel());
    gameProgress.setAnimalType(gameProgressDetails.getAnimalType());
    gameProgress.setCompleted(gameProgressDetails.isCompleted());

    // บันทึกการเปลี่ยนแปลง
    GameProgress updatedProgress = gameProgressRepository.save(gameProgress);
    
    // ส่งคืนการอัพเดท
    return ResponseEntity.ok(updatedProgress);
}
}
