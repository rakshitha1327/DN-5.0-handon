package com.cognizant.springlearn.util;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

/**
 * EXERCISE 3: Generate a JWT token based on the user retrieved from
 * the previous (authentication) step.
 */
@Component
public class JwtUtil {

    // NOTE: For a real application, load this secret from an environment
    // variable or a secrets vault - never hardcode it in source control.
    // It must be at least 256 bits (32 chars) long for the HS256 algorithm.
    private static final String SECRET = "MyJwtSecretKeyForSpringLearnDemoApplication1234567890";
    private static final Key SIGNING_KEY = Keys.hmacShaKeyFor(SECRET.getBytes());

    // Token validity: 20 minutes (1200 seconds) - matches the iat/exp gap
    // seen in the sample response given in the requirements.
    private static final long TOKEN_VALIDITY_MILLIS = 1000L * 60 * 20;

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return createToken(claims, userDetails.getUsername());
    }

    private String createToken(Map<String, Object> claims, String subject) {
        long nowMillis = System.currentTimeMillis();
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(nowMillis))
                .setExpiration(new Date(nowMillis + TOKEN_VALIDITY_MILLIS))
                .signWith(SIGNING_KEY, SignatureAlgorithm.HS256)
                .compact();
    }
}
