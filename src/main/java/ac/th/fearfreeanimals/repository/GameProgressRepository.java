package ac.th.fearfreeanimals.repository;

import ac.th.fearfreeanimals.entity.GameProgress;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import java.util.Optional;
@Repository
public interface GameProgressRepository extends JpaRepository<GameProgress, Long> {
    
    Optional<GameProgress> findByUserId(Long userId);
    @Modifying
    @Transactional
    @Query("UPDATE GameProgress g SET g.currentLevel = :currentLevel, g.completed = :completed WHERE g.user.id = :userId AND g.animalType = :animalType")
    void updateGameProgress(Long userId, String animalType, Integer currentLevel, Boolean completed);
}
