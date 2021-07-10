package core.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import core.model.User;
import core.repositorie.UserRepository;

@RestController
public class UserController {
    @Autowired
    private UserRepository repo;
     
    @GetMapping("/users")
    public List<User> listAll(Model model) {
        List<User> listUsers = repo.findAll();
        return listUsers;
    }
     
}