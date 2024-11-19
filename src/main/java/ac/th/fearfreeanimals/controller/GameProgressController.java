package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.service.GameProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
@CrossOrigin
@RestController
@RequestMapping("/game-progress")
public class GameProgressController {

    @Autowired
    private GameProgressService gameProgressService;

    // Get game progress by userId
    @GetMapping("/{userId}")
    public ResponseEntity<GameProgress> getGameProgress(@PathVariable Long userId) {
        GameProgress progress = gameProgressService.getGameProgress(userId);
        return ResponseEntity.ok(progress);
    }

    // Create game progress
    @PostMapping("/{userId}")
    public ResponseEntity<GameProgress> createGameProgress(
            @PathVariable Long userId,
            @RequestBody GameProgress newProgress) {
        GameProgress createdProgress = gameProgressService.createGameProgress(userId, newProgress);
        return ResponseEntity.ok(createdProgress);
    }

    // Update game progress
    @PutMapping("/{userId}")
    public ResponseEntity<GameProgress> updateGameProgress(
            @PathVariable Long userId,
            @RequestBody GameProgress gameProgressDetails) {
        GameProgress updatedProgress = gameProgressService.updateGameProgress(userId, gameProgressDetails);
        return ResponseEntity.ok(updatedProgress);
    }

    // Move to the next level
    @PutMapping("/next-level/{userId}")
    public ResponseEntity<GameProgress> nextLevel(@PathVariable Long userId) {
        GameProgress updatedProgress = gameProgressService.nextLevel(userId);
        return ResponseEntity.ok(updatedProgress);
    }
}
