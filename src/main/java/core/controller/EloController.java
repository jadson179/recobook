package core.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
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

    private EloService eloService;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @PostMapping("/elo")
    public ResponseEntity<Boolean>  saveAndFlush (@RequestBody Elo elo,@RequestHeader Map<String,String> headers) {

        eloService = new EloService();
        
        if(eloService.saveAndFlush(elo,eloRepo,headers)){
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }



    

}
