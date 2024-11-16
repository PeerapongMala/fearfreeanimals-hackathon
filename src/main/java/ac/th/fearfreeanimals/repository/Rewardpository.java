package ac.th.fearfreeanimals.repository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import ac.th.fearfreeanimals.entity.reward;

@Repository
public interface Rewardpository extends JpaRepository<reward, Long> {
    
}


