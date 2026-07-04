package com.cognizant.springlearn.controller;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.springlearn.model.AuthenticationResponse;
import com.cognizant.springlearn.util.JwtUtil;

@RestController
public class AuthenticationController {

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationController.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserDetailsService userDetailsService;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/authenticate")
    public ResponseEntity<?> authenticate(HttpServletRequest request) {
        logger.debug("Start :: authenticate()");

        // ---------------------------------------------------------------
        // EXERCISE 2: Read the Authorization header and decode the
        // username and password sent via curl's -u option.
        // -u sends: "Authorization: Basic <base64(username:password)>"
        // ---------------------------------------------------------------
        String authHeader = request.getHeader("Authorization");

        if (authHeader == null || !authHeader.startsWith("Basic ")) {
            logger.debug("End :: authenticate() - missing/invalid Authorization header");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Missing or invalid Authorization header");
        }

        String base64Credentials = authHeader.substring("Basic ".length());
        String decoded = new String(Base64.getDecoder().decode(base64Credentials), StandardCharsets.UTF_8);
        // decoded now looks like "user:pwd"
        String[] credentials = decoded.split(":", 2);
        String username = credentials[0];
        String password = credentials.length > 1 ? credentials[1] : "";

        try {
            // Validates username/password against the UserDetailsService +
            // PasswordEncoder configured in SecurityConfig (Exercise 1).
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password));
        } catch (BadCredentialsException e) {
            logger.debug("End :: authenticate() - bad credentials");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Incorrect username or password");
        }

        // ---------------------------------------------------------------
        // EXERCISE 3: Generate the token based on the user retrieved above.
        // ---------------------------------------------------------------
        UserDetails userDetails = userDetailsService.loadUserByUsername(username);
        String token = jwtUtil.generateToken(userDetails);

        logger.debug("End :: authenticate()");
        return ResponseEntity.ok(new AuthenticationResponse(token));
    }
}
