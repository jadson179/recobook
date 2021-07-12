package core.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import core.model.Video;
 
public interface VideoRepository extends JpaRepository<Video, Integer> {
    
}