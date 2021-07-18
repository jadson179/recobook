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


import core.model.Image;
import core.model.dto.ImageDTO;
import core.repositorie.EloRepository;
import core.repositorie.ImageRepository;
import core.repositorie.UserRepository;
import core.service.ImageService;
import core.service.UserService;

@RestController
public class ImageController {

    @Autowired
    private ImageRepository imageRepo;

    @Autowired
    private UserRepository userRepo;

    private ImageService imageService;

    @Autowired
    private JdbcTemplate jdbcTemplate;


    @PostMapping("/image")
    public ResponseEntity<Boolean>  saveAndFlush (@RequestBody ImageDTO imageDTO,@RequestHeader Map<String,String> headers) {

        imageService = new ImageService();
        
        if(imageService.saveAndFlush(imageDTO,imageRepo,jdbcTemplate,headers)){
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);    
    }


    @PutMapping("/image")
    public ResponseEntity<Boolean>  update (@RequestBody  ImageDTO imageDTO,@RequestHeader Map<String,String> headers) {

        imageService = new ImageService();
        
        if(imageService.update(imageDTO,imageRepo,jdbcTemplate,headers)){
            return new ResponseEntity<>(true, HttpStatus.CREATED);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);  
    }

    @DeleteMapping("/image")
    public ResponseEntity<Boolean>  delete (@RequestBody  ImageDTO imageDTO,@RequestHeader Map<String,String> headers) {

        imageService = new ImageService();
        
        if(imageService.delete(imageDTO,imageRepo,jdbcTemplate,headers)){
            return new ResponseEntity<>(true, HttpStatus.OK);
        }

        return new ResponseEntity<>(false, HttpStatus.INTERNAL_SERVER_ERROR);  
    }


    

}
