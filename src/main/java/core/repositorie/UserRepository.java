package core.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import core.model.User;
 
public interface UserRepository extends JpaRepository<User, Integer> {
 
}