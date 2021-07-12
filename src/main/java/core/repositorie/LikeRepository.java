package core.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import core.model.Like;
 
public interface LikeRepository extends JpaRepository<Like, Integer> {
    
}