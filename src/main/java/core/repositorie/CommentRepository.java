package core.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import core.model.Comment;
 
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
}