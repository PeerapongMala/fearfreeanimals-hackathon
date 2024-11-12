package ac.th.fearfreeanimals.repository;

import ac.th.fearfreeanimals.entity.Coins;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CoinsRepository extends JpaRepository<Coins, Long> {
}
