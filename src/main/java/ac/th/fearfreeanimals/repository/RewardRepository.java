package ac.th.fearfreeanimals.repository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import ac.th.fearfreeanimals.entity.Reward;

@Repository
public interface RewardRepository extends JpaRepository<Reward, Long> {
    
}


