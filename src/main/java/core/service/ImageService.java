package core.service;

import java.util.Map;

import org.springframework.jdbc.core.JdbcTemplate;
import javax.xml.bind.DatatypeConverter;

import core.model.Elo;
import core.model.Image;
import core.model.User;
import core.model.dto.ImageDTO;
import core.repositorie.ImageRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class ImageService {

    public boolean saveAndFlush(ImageDTO imageDTO, ImageRepository imageRepo, JdbcTemplate jdbcTemplate,
            Map<String, String> headers) {

        if (headers.get("authorization").equals(null))
            throw new Error("Header token is required");

        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                .parseClaimsJws(headers.get("authorization")).getBody();

        UserService userService = new UserService();

        User user = userService.findById(Long.parseLong(claims.get("id").toString()), jdbcTemplate);

        if (user.equals(null))
            throw new Error("User not exists");

        Image image = new Image();

        EloService eloService = new EloService();

        Elo elo = eloService.findById(imageDTO.getId_elo(), jdbcTemplate);

        if (elo.equals(null))
            throw new Error("Elo not exists");

        image.setElo(elo);
        image.setUrl(imageDTO.getUrl());

        imageRepo.saveAndFlush(image);

        return true;
    }

    public boolean update(ImageDTO imageDTO, ImageRepository imageRepo, JdbcTemplate jdbcTemplate,
            Map<String, String> headers) {
        if (headers.get("authorization").equals(null))
            throw new Error("Header token is required");

        if (imageDTO.getId().equals(null))
            throw new Error("Id elo is required");

        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                .parseClaimsJws(headers.get("authorization")).getBody();

        EloService eloService = new EloService();

        Elo elo = eloService.findById(imageDTO.getId_elo(), jdbcTemplate);

        if (elo.equals(null))
            throw new Error("Elo not exists");

        if (elo.getUser().getId() != Long.parseLong(claims.get("id").toString()))
            throw new Error("User can not update this image");

        Image image = new Image();

        image.setId(imageDTO.getId());
        image.setElo(elo);
        image.setUrl(imageDTO.getUrl());

        imageRepo.saveAndFlush(image);

        return true;
    }

    public boolean delete(ImageDTO imageDTO, ImageRepository imageRepo, JdbcTemplate jdbcTemplate,
            Map<String, String> headers) {

        try {
            if (headers.get("authorization").equals(null))
                throw new Error("Header token is required");

            if (imageDTO.getId().equals(null))
                throw new Error("Id elo is required");

            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                    .parseClaimsJws(headers.get("authorization")).getBody();

            EloService eloService = new EloService();

            Elo elo = eloService.findById(imageDTO.getId_elo(), jdbcTemplate);

            
            if (elo.equals(null))
                throw new Error("Elo not exists");

            if (elo.getUser().getId() != Long.parseLong(claims.get("id").toString()))
                throw new Error("User can not update this image");

            if(imageRepo.findById(imageDTO.getId()).get().equals(null))
                throw new Error("Image not exists");

            Image image = new Image();

            image.setId(imageDTO.getId());

            imageRepo.delete(image);

            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
