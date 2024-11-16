package ac.th.fearfreeanimals.repository;

import ac.th.fearfreeanimals.entity.Reward;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface RewardRepository extends JpaRepository<Reward, Long> {
    Optional<Reward> findById(Long userId);
}
