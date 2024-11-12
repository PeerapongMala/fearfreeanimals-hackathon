package ac.th.fearfreeanimals.controller;

import ac.th.fearfreeanimals.entity.Coins;
import ac.th.fearfreeanimals.repository.CoinsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/coins")
public class CoinsController {

    private final CoinsRepository coinsRepository;

    @Autowired
    public CoinsController(CoinsRepository coinsRepository) {
        this.coinsRepository = coinsRepository;
    }

    // Get all coins
    @GetMapping
    public ResponseEntity<List<Coins>> getAllCoins() {
        List<Coins> coins = coinsRepository.findAll();
        return ResponseEntity.ok(coins);
    }

    // Create new coins entry
    @PostMapping
    public ResponseEntity<Coins> createCoins(@RequestBody Coins coins) {
        Coins createdCoins = coinsRepository.save(coins);
        return ResponseEntity.ok(createdCoins);
    }

    // Get coins by ID
    @GetMapping("/{id}")
    public ResponseEntity<Coins> getCoinsById(@PathVariable Long id) {
        Coins coins = coinsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coins not found with id " + id));
        return ResponseEntity.ok(coins);
    }

    // Update coins by ID
    @PutMapping("/{id}")
    public ResponseEntity<Coins> updateCoins(@PathVariable Long id, @RequestBody Coins coinsDetails) {
        Coins coins = coinsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coins not found with id " + id));

        coins.setBalance(coinsDetails.getBalance());
        coins.setLastUpdated(coinsDetails.getLastUpdated());

        Coins updatedCoins = coinsRepository.save(coins);
        return ResponseEntity.ok(updatedCoins);
    }

    // Delete coins by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoins(@PathVariable Long id) {
        Coins coins = coinsRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Coins not found with id " + id));

        coinsRepository.delete(coins);
        return ResponseEntity.noContent().build();
    }
}
