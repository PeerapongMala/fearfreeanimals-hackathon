package ac.th.fearfreeanimals.repository;

import ac.th.fearfreeanimals.controller.Reward;
import ac.th.fearfreeanimals.entity.GameProgress;
import ac.th.fearfreeanimals.entity.RewardRedemption;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RewardRedemptionRepository extends JpaRepository<RewardRedemption, Long> {
    Optional<Reward> findByUserId(Long userId);
}
