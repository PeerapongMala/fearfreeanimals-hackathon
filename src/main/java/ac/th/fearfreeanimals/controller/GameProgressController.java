package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.service.GameProgressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/game-progress")
public class GameProgressController {

    @Autowired
    private GameProgressService gameProgressService;

    // ดึงข้อมูลความคืบหน้าเกม
    @GetMapping("/{userId}")
    public ResponseEntity<GameProgress> getProgress(@PathVariable Long userId) {
        GameProgress progress = gameProgressService.getProgress(userId);
        return ResponseEntity.ok(progress);
    }

    // อัปเดตข้อมูลความคืบหน้าเกมพร้อมคำอธิบาย
    @PostMapping("/{userId}/update")
    public ResponseEntity<GameProgress> updateGameProgress(
            @PathVariable Long userId,
            @RequestParam Integer currentLevel,
            @RequestParam String description) {
        GameProgress progress = gameProgressService.updateGameProgress(userId, description, currentLevel);
        return ResponseEntity.ok(progress);
    }

    // อัปเดตข้อมูลความคืบหน้าเกม (เฉพาะด่าน)
    @PutMapping("/{userId}")
    public ResponseEntity<GameProgress> updateProgress(
            @PathVariable Long userId,
            @RequestParam int currentLevel) {
        GameProgress updatedProgress = gameProgressService.updateProgress(userId, currentLevel);
        return ResponseEntity.ok(updatedProgress);
    }
}
