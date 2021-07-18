package core.repositorie;

import org.springframework.data.jpa.repository.JpaRepository;

import core.model.Elo;
 
public interface EloRepository extends JpaRepository<Elo, Long> { }