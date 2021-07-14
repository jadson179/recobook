package core.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import core.model.User;
import core.repositorie.UserRepository;
import core.service.AuthService;

@RestController
public class AuthController {
    @Autowired
    private UserRepository repo;

    @Autowired
    private JdbcTemplate jdbcTemplate;

    private AuthService authService;

    @PostMapping("/auth")
    public ResponseEntity<Map<String,Object>> auth(@RequestBody User user) {

        authService = new AuthService();
        Map<String,Object> response = authService.auth(user, repo, jdbcTemplate);

        if (response == null) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }

        return new ResponseEntity<>(response, HttpStatus.FOUND);

    }

}