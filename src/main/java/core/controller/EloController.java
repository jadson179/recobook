package core.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import core.model.Elo;
import core.repositorie.EloRepository;
import core.repositorie.UserRepository;
import core.service.EloService;

@RestController
public class EloController {

    @Autowired
    private EloRepository eloRepo;

    @Autowired
    private UserRepository userRepo;

    private EloService eloService;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @PostMapping("/elo")
    public ResponseEntity<Boolean>  saveAndFlush (@RequestBody Elo elo,@RequestHeader Map<String,String> headers) {

        eloService = new EloService();
        
        if(eloService.saveAndFlush(elo,eloRepo,jdbcTemplate,headers)){
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @PutMapping("/elo")
    public ResponseEntity<Boolean>  update (@RequestBody Elo elo,@RequestHeader Map<String,String> headers) {

        eloService = new EloService();
        
        if(eloService.update(elo,eloRepo,headers)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/elo")
    public ResponseEntity<Boolean>  delete (@RequestBody Elo elo,@RequestHeader Map<String,String> headers) {

        eloService = new EloService();
        
        if(eloService.delete(elo,jdbcTemplate,headers)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    

}
