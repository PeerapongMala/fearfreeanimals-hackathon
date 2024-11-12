package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.RewardRedemption;
import ac.th.fearfreeanimals.repository.RewardRedemptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/reward-redemptions")
public class RewardRedemptionController {

    private final RewardRedemptionRepository rewardRedemptionRepository;

    @Autowired
    public RewardRedemptionController(RewardRedemptionRepository rewardRedemptionRepository) {
        this.rewardRedemptionRepository = rewardRedemptionRepository;
    }

    // Get all reward redemptions
    @GetMapping
    public ResponseEntity<List<RewardRedemption>> getAllRewardRedemptions() {
        List<RewardRedemption> rewardRedemptions = rewardRedemptionRepository.findAll();
        return ResponseEntity.ok(rewardRedemptions);
    }

    // Create new reward redemption
    @PostMapping
    public ResponseEntity<RewardRedemption> createRewardRedemption(@RequestBody RewardRedemption rewardRedemption) {
        RewardRedemption createdRewardRedemption = rewardRedemptionRepository.save(rewardRedemption);
        return ResponseEntity.ok(createdRewardRedemption);
    }

    // Get reward redemption by ID
    @GetMapping("/{id}")
    public ResponseEntity<RewardRedemption> getRewardRedemptionById(@PathVariable Long id) {
        RewardRedemption rewardRedemption = rewardRedemptionRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Reward redemption not found with id " + id));
        return ResponseEntity.ok(rewardRedemption);
    }

    // Delete reward redemption by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRewardRedemption(@PathVariable Long id) {
        rewardRedemptionRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
