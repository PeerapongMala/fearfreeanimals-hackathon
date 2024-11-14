package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.service.GameProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game-progress")
public class GameProgressController {

    private final GameProgressService gameProgressService;

    @Autowired
    public GameProgressController(GameProgressService gameProgressService) {
        this.gameProgressService = gameProgressService;
    }

    // Get all game progress
    @GetMapping
    public ResponseEntity<List<GameProgress>> getAllGameProgress() {
        List<GameProgress> gameProgressList = gameProgressService.getAllGameProgress();
        return ResponseEntity.ok(gameProgressList);
    }

    // Create new game progress
    @PostMapping
    public ResponseEntity<GameProgress> createGameProgress(@RequestBody GameProgress gameProgress) {
        GameProgress createdGameProgress = gameProgressService.createGameProgress(gameProgress);
        return ResponseEntity.ok(createdGameProgress);
    }

    // Get game progress by ID
    @GetMapping("/{id}")
    public ResponseEntity<GameProgress> getGameProgressById(@PathVariable Long id) {
        GameProgress gameProgress = gameProgressService.getGameProgressById(id);
        return ResponseEntity.ok(gameProgress);
    }

    // Update game progress
    @PutMapping("/{userId}")
    public ResponseEntity<String> updateGameProgress(@PathVariable Long userId,
                                                     @RequestParam String animalType,
                                                     @RequestParam Integer currentLevel,
                                                     @RequestParam Boolean completed) {
        gameProgressService.updateGameProgress(userId, animalType, currentLevel, completed);
        return ResponseEntity.ok("Game progress updated successfully!");
    }
}
