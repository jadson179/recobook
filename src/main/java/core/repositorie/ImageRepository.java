package core.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import core.model.Image;
 
public interface ImageRepository extends JpaRepository<Image, Integer> {
    
}