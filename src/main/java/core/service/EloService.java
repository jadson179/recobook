package core.service;

import java.util.Map;

import core.model.Elo;
import core.model.User;
import core.repositorie.EloRepository;

import javax.xml.bind.DatatypeConverter;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;

public class EloService {
    
    public EloService(){}

    public boolean saveAndFlush(Elo elo, EloRepository eloRepo,Map<String, String> headers) {
        try {
            if (headers.get("authorization").equals(null))
                throw new Error("Header token is required");
            
            Claims claims = Jwts.parser()
            .setSigningKey(DatatypeConverter.parseBase64Binary(System.getenv("SERVICE_AUTH_KEY")))
            .parseClaimsJws(headers.get("authorization")).getBody();

            User user =  new User();
            
            user.setId(Long.parseLong(claims.get("id").toString()));

            elo.setId(null);

            elo.setUser(user);

            eloRepo.saveAndFlush(elo);

            return true;
        } catch (Exception e) {
            System.out.println(elo.getAddress());
            System.out.println(elo.getCategory());
            System.out.println(elo.getDescription());
        
        
            return false;
        }

    }

}
