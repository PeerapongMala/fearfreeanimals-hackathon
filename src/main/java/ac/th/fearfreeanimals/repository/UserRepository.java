package ac.th.fearfreeanimals.repository;

import ac.th.fearfreeanimals.entity.Username;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<Username, Long> {

    // Find user by username
    Optional<Username> findByUsername(String username);

    // Check if a username exists
    boolean existsByUsername(String username);

}