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

import core.model.User;
import core.repositorie.UserRepository;
import core.service.UserService;


@RestController
public class UserController {
    @Autowired
    private UserRepository repo;
    
    private UserService userService;

    @Autowired
    private JdbcTemplate jdbcTemplate;

     
    @PostMapping("/user")
    public ResponseEntity<Boolean>  saveAndFlush (@RequestBody User user) {

        userService = new UserService();
        
        if(userService.saveAndFlush(user,repo)){
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @PutMapping("/user")
    public ResponseEntity<Boolean>  update (@RequestBody User user,@RequestHeader Map<String,String> headers) {

        userService = new UserService();
        
        if(userService.update(user,repo,headers)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }


    @DeleteMapping("/user")
    public ResponseEntity<Boolean>  delete (@RequestHeader Map<String,String> headers) {

        userService = new UserService();
        
        if(userService.delete(jdbcTemplate,headers)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);
    }



     
}