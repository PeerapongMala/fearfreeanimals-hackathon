package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.repository.GameProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/game-progress")
public class GameProgressController {

    private final GameProgressRepository gameProgressRepository;

    @Autowired
    public GameProgressController(GameProgressRepository gameProgressRepository) {
        this.gameProgressRepository = gameProgressRepository;
    }

    // Get all game progress
    @GetMapping
    public ResponseEntity<List<GameProgress>> getAllGameProgress() {
        List<GameProgress> gameProgressList = gameProgressRepository.findAll();
        return ResponseEntity.ok(gameProgressList);
    }

    // Create new game progress
    @PostMapping
    public ResponseEntity<GameProgress> createGameProgress(@RequestBody GameProgress gameProgress) {
        GameProgress createdGameProgress = gameProgressRepository.save(gameProgress);
        return ResponseEntity.ok(createdGameProgress);
    }

    // Get game progress by ID
    @GetMapping("/{id}")
    public ResponseEntity<GameProgress> getGameProgressById(@PathVariable Long id) {
        GameProgress gameProgress = gameProgressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game progress not found with id " + id));
        return ResponseEntity.ok(gameProgress);
    }
}
