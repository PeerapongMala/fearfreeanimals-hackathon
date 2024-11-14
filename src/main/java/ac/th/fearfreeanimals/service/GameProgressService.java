package ac.th.fearfreeanimals.service;

import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.repository.GameProgressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GameProgressService {

    private final GameProgressRepository gameProgressRepository;

    @Autowired
    public GameProgressService(GameProgressRepository gameProgressRepository) {
        this.gameProgressRepository = gameProgressRepository;
    }

    public List<GameProgress> getAllGameProgress() {
        return gameProgressRepository.findAll();
    }

    public GameProgress getGameProgressById(Long id) {
        return gameProgressRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Game progress not found with id " + id));
    }

    public GameProgress createGameProgress(GameProgress gameProgress) {
        return gameProgressRepository.save(gameProgress);
    }

    public void updateGameProgress(Long userId, String animalType, Integer currentLevel, Boolean completed) {
        gameProgressRepository.updateGameProgress(userId, animalType, currentLevel, completed);
    }
}
