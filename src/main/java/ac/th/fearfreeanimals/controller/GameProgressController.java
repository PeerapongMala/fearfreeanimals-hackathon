package ac.th.fearfreeanimals.controller;
import ac.th.fearfreeanimals.service.CoinsService;
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
    private final CoinsService coinsService;
    private void validateUserId(Long userId) {
    if (!userRepository.existsById(userId)) {
        throw new RuntimeException("User with ID " + userId + " does not exist.");
    }
}

    @Autowired
    public GameProgressController(GameProgressService gameProgressService, 
                                  GameProgressRepository gameProgressRepository, 
                                  UserRepository userRepository,
                                  CoinsService coinsService) {
        this.gameProgressService = gameProgressService;
        this.gameProgressRepository = gameProgressRepository;
        this.userRepository = userRepository;
        this.coinsService = coinsService;  // ประกาศตัวแปร userRepository
    }

    // ดึงข้อมูลความคืบหน้าของเกมตาม `userId`
    @GetMapping("/{userId}")
    public ResponseEntity<GameProgress> getGameProgress(@PathVariable Long userId) {
        // ค้นหาความคืบหน้าของเกมตาม `userId`
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
// เพิ่มฟังก์ชันเพื่อไปยังเลเวลถัดไป
@PutMapping("/next-level/{userId}")
public ResponseEntity<GameProgress> nextLevel(@PathVariable Long userId) {
    validateUserId(userId);
    
    // ค้นหาข้อมูล progress ของผู้ใช้
    GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
            .orElseThrow(() -> new RuntimeException("Game progress not found with userId " + userId));

    // เพิ่มเลเวลถัดไป
    int currentLevel = gameProgress.getCurrentLevel();
    gameProgress.setCurrentLevel(gameProgress.getCurrentLevel() + 1);
    

      // เพิ่มเหรียญเมื่อผู้ใช้จบด่านที่ 10
      if (currentLevel == 10) {
        // สมมุติว่าเรามี entity ที่ชื่อว่า `Coin` หรือ `Coins` ซึ่งเก็บเหรียญของผู้ใช้
        // เพิ่มเหรียญ 1 เมื่อจบด่านที่ 10
        // เชื่อมต่อกับ entity เหรียญ และบันทึกข้อมูลเหรียญ
        // สมมุติว่า `coins` คือ entity ที่เชื่อมโยงกับผู้ใช้
        coinsService.addCoins(userId, 1); // เพิ่มเหรียญ 1
    }
    // บันทึกข้อมูลที่อัปเดต
    GameProgress updatedProgress = gameProgressRepository.save(gameProgress);

    return ResponseEntity.ok(updatedProgress);
}

}
