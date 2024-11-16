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

    public GameProgress updateProgress(Long userId, int currentLevel) {
        // ค้นหาผู้ใช้
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found with id " + userId));

        // ค้นหาความคืบหน้าเกมหรือสร้างใหม่
        GameProgress gameProgress = gameProgressRepository.findByUserId(userId)
                .orElseGet(() -> new GameProgress(user, null)); // null เพราะยังไม่มี Animal Type

        // อัปเดตข้อมูล
        gameProgress.setCurrentLevel(currentLevel);
        gameProgress.setCompleted(currentLevel == 10); // สมมติว่าด่าน 10 คือด่านสุดท้าย

        // บันทึกข้อมูล
        return gameProgressRepository.save(gameProgress);
    }

    public GameProgress getProgress(Long userId) {
        return gameProgressRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("Game progress not found for user id " + userId));
    }
}
