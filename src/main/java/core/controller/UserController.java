package core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import core.model.User;
import core.repositorie.UserRepository;

@RestController
public class UserController {
    @Autowired
    private UserRepository repo;

    @Autowired
    private JdbcTemplate database;
     
    @GetMapping("/users")
    public List<User> listAll(Model model) {
        

        List<User> users = database.query("SELECT * FROM users;",new BeanPropertyRowMapper<User>(User.class));
        
        
        return users;
    }

     
}