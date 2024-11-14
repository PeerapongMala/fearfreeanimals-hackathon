package ac.th.fearfreeanimals.repository;

import ac.th.fearfreeanimals.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
<<<<<<< HEAD

=======
>>>>>>> 84e8640ae2fe19bcca8f00116fa9f8842f9f54b8
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Optional<User> findByAccessCode(String accessCode);

    boolean existsByUsername(String username);

    long countByRoleName(String roleName);
}
