package core.service;


import java.util.Map;

import core.model.Elo;
import core.model.User;
import core.repositorie.EloRepository;

import javax.xml.bind.DatatypeConverter;

import org.springframework.jdbc.core.JdbcTemplate;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class EloService {

    public EloService() {
    }

    public boolean saveAndFlush(Elo elo, EloRepository eloRepo, JdbcTemplate jdbcTemplate, Map<String, String> headers) {
        try {
            if (headers.get("authorization").equals(null))
                throw new Error("Header token is required");

            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                    .parseClaimsJws(headers.get("authorization")).getBody();

            UserService userService = new UserService();

            User user =  userService.findById(Long.parseLong(claims.get("id").toString()), jdbcTemplate);
           
            if (user.equals(null))
                throw new Error("User not exists");


            elo.setUser(user);                
            eloRepo.saveAndFlush(elo);

            return true;
        } catch (Exception e) {

            return false;
        }

    }


    public boolean update(Elo elo, EloRepository eloRepo, Map<String, String> headers) {
        try {

            if (headers.get("authorization").equals(null))
                throw new Error("Header token is required");
            if (elo.getId().equals(null))
                throw new Error("id is required");

            Claims claims = Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                    .parseClaimsJws(headers.get("authorization")).getBody();

            elo.setId(Long.parseLong(claims.get("id").toString()));

            eloRepo.saveAndFlush(elo);

            return true;

        } catch (Exception e) {
            return false;
        }

    }

    public boolean delete(Elo elo,JdbcTemplate jdbcTemplate, Map<String, String> headers) {

        try {
            if (headers.get("authorization").equals(null))
                throw new Error("Header token is required");

            Claims claims =  Jwts.parser()
                    .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                    .parseClaimsJws(headers.get("authorization")).getBody();

            String sql = "DELETE FROM elos WHERE "
            .concat("id = " + elo.getId() + ";")
            .concat("id_user = " +claims.get("id") + ";");

            jdbcTemplate.execute(sql);

            return true;
        } catch (Exception e) {
            return false;
        }
    }


}
