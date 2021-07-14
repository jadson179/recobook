package core.service;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

import org.springframework.jdbc.core.RowMapper;

import org.springframework.jdbc.core.JdbcTemplate;

import core.model.User;
import core.repositorie.UserRepository;

public class AuthService {

    public AuthService() {
    }

    public Map<String, Object> auth(User user, UserRepository repo, JdbcTemplate jdbcTemplate) {

        try {

            String sql = "SELECT id,name,email,username,photo,bio FROM users WHERE "
                    .concat("( email = '" + user.getEmail() + "' OR " + "username = '" + user.getUsername() + "') AND ")
                    .concat("password = '" + user.getPassword() + "';");

            User userDatabase = jdbcTemplate.queryForObject(sql, new RowMapper<User>() {
                public User mapRow(ResultSet rs, int rowNum) throws SQLException {
                    User user = new User();
                    user.setId(rs.getLong("id"));
                    user.setName(rs.getString("name"));
                    user.setEmail(rs.getString("email"));
                    user.setUsername(rs.getString("username"));
                    user.setPhoto(rs.getString("photo"));
                    user.setBio(rs.getString("bio"));
                    return user;
                }
            });

            if (userDatabase.equals(null))
                throw new Error("Error in username or email or password");

            Map<String, Object> userClaims = new HashMap<>();

            userClaims.put("user", userDatabase);
            userClaims.put("id", userDatabase.getId());
            userClaims.put("name", userDatabase.getName());
            userClaims.put("email", userDatabase.getEmail());
            userClaims.put("username", userDatabase.getUsername());
            userClaims.put("photo", userDatabase.getPhoto());
            userClaims.put("bio", userDatabase.getBio());

            String token = Jwts.builder().setIssuedAt(new Date(System.currentTimeMillis()))
                    .setExpiration(new Date(System.currentTimeMillis() - 1200000))
                    .signWith(SignatureAlgorithm.HS256, System.getenv("SERVICE_AUTH_KEY")).setClaims(userClaims)
                    .compact();

            Map<String, Object> result = new HashMap<>();

            result.put("token", token);
            result.put("user", userDatabase);

            return result;

        } catch (Exception e) {
            return null;
        }

    }
}
