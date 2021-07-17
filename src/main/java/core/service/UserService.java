package core.service;

import java.util.Map;

import core.model.User;
import core.repositorie.UserRepository;
import javax.xml.bind.DatatypeConverter;

import org.springframework.jdbc.core.JdbcTemplate;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtParser;

public class UserService {

    public UserService() {
    }

    public boolean saveAndFlush(User user, UserRepository repo) {
        try {
            user.setId(null);
            repo.saveAndFlush(user);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    public boolean update(User user, UserRepository repo, Map<String, String> headers) {

        if (headers.get("authorization").equals(null))
            throw new Error("Header token is required");
        if (user.getId().equals(null))
            throw new Error("id is required");

        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                .parseClaimsJws(headers.get("authorization")).getBody();

        user.setId(Long.parseLong(claims.get("id").toString()));

        repo.saveAndFlush(user);

        return true;

    }

    public boolean delete(JdbcTemplate jdbcTemplate, Map<String, String> headers) {

        if (headers.get("authorization").equals(null))
            throw new Error("Header token is required");

        Claims claims = Jwts.parser()
                .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
                .parseClaimsJws(headers.get("authorization")).getBody();

        
        String sql = "DELETE FROM users WHERE "
        .concat("id = "+claims.get("id") + ";" );

        jdbcTemplate.execute(sql);


        return true;

    }
}
