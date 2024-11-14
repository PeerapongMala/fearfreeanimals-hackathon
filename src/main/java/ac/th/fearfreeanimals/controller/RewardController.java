package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.RewardRedemption;
import ac.th.fearfreeanimals.repository.RewardRedemptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
<<<<<<<< HEAD:src/main/java/ac/th/fearfreeanimals/controller/RewardController.java
@RequestMapping("/rewards")
public class RewardController {
========
@RequestMapping("/reward")
public class Reward {
>>>>>>>> 84e8640ae2fe19bcca8f00116fa9f8842f9f54b8:src/main/java/ac/th/fearfreeanimals/controller/Reward.java

    private final RewardRedemptionRepository rewardRedemptionRepository;

    @Autowired
<<<<<<<< HEAD:src/main/java/ac/th/fearfreeanimals/controller/RewardController.java
    public RewardController(RewardRedemptionRepository rewardRedemptionRepository) {
========
    public Reward(RewardRedemptionRepository rewardRedemptionRepository) {
>>>>>>>> 84e8640ae2fe19bcca8f00116fa9f8842f9f54b8:src/main/java/ac/th/fearfreeanimals/controller/Reward.java
        this.rewardRedemptionRepository = rewardRedemptionRepository;
    }

    // Get all reward redemptions
    @GetMapping
    public ResponseEntity<List<RewardRedemption>> getAllReward() {
        List<RewardRedemption> rewardRedemptions = rewardRedemptionRepository.findAll();
        return ResponseEntity.ok(rewardRedemptions);
    }

    // Create new reward redemption
    @PostMapping
    public ResponseEntity<RewardRedemption> createReward(@RequestBody RewardRedemption rewardRedemption) {
        RewardRedemption createdRewardRedemption = rewardRedemptionRepository.save(rewardRedemption);
        return ResponseEntity.ok(createdRewardRedemption);
    }

    // Get reward redemption by ID
    @GetMapping("/{id}")
    public ResponseEntity<RewardRedemption> getRewardById(@PathVariable Long id) {
        RewardRedemption rewardRedemption = rewardRedemptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reward redemption not found with id " + id));
        return ResponseEntity.ok(rewardRedemption);
    }

    // Delete reward redemption by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReward(@PathVariable Long id) {
        rewardRedemptionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
