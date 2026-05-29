package com.avatarquestions.service;

import com.avatarquestions.dto.AuthResponse;
import com.avatarquestions.dto.LoginRequest;
import com.avatarquestions.dto.SignupRequest;
import com.avatarquestions.entity.User;
import com.avatarquestions.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Map;
import java.util.UUID;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final RestTemplate restTemplate;

    @Value("${google.client.id}")
    private String googleClientId;

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        this.restTemplate = new RestTemplate();
    }

    public AuthResponse signup(SignupRequest request) {
        if (userRepository.existsByUsername(request.getUsername())) {
            return new AuthResponse(false, "Username already taken", null);
        }

        User user = new User(
                request.getUsername(),
                request.getPassword(),
                request.getSecurityQuestion1(),
                request.getSecurityAnswer1(),
                request.getSecurityQuestion2(),
                request.getSecurityAnswer2()
        );

        userRepository.save(user);
        return new AuthResponse(true, "Account created successfully", user.getUsername());
    }

    public AuthResponse login(LoginRequest request) {
        var userOpt = userRepository.findByUsername(request.getUsername());

        if (userOpt.isEmpty()) {
            return new AuthResponse(false, "Invalid username or password", null);
        }

        User user = userOpt.get();
        if (!user.getPassword().equals(request.getPassword())) {
            return new AuthResponse(false, "Invalid username or password", null);
        }

        return new AuthResponse(true, "Login successful", user.getUsername());
    }

    @SuppressWarnings("unchecked")
    public AuthResponse googleLogin(String credential) {
        try {
            String tokenInfoUrl = "https://oauth2.googleapis.com/tokeninfo?id_token=" + credential;
            Map<String, Object> tokenInfo = restTemplate.getForObject(tokenInfoUrl, Map.class);

            if (tokenInfo == null) {
                return new AuthResponse(false, "Failed to verify Google token", null);
            }

            String aud = (String) tokenInfo.get("aud");
            if (!googleClientId.equals(aud)) {
                return new AuthResponse(false, "Token audience mismatch", null);
            }

            String email = (String) tokenInfo.get("email");
            String name = (String) tokenInfo.get("name");
            if (email == null) {
                return new AuthResponse(false, "No email in Google token", null);
            }

            if (email.isBlank()) {
                return new AuthResponse(false, "Email is blank", null);
            }

            var existingUser = userRepository.findByEmail(email);
            if (existingUser.isPresent()) {
                User user = existingUser.get();
                return new AuthResponse(true, "Login successful", user.getUsername());
            }

            var existingByUsername = userRepository.findByUsername(email);
            if (existingByUsername.isPresent()) {
                return new AuthResponse(false, "Email already registered as username", null);
            }

            String displayName = (name != null && !name.isBlank()) ? name : email.split("@")[0];
            String baseUsername = displayName.replaceAll("\\s+", "_").toLowerCase();
            String username = baseUsername;
            int suffix = 1;
            while (userRepository.existsByUsername(username)) {
                username = baseUsername + suffix;
                suffix++;
            }

            User newUser = new User(
                    username,
                    UUID.randomUUID().toString(),
                    "What is your favorite color?",
                    "placeholder",
                    "What is your pet's name?",
                    "placeholder"
            );
            newUser.setEmail(email);
            newUser.setProvider("google");
            userRepository.save(newUser);

            return new AuthResponse(true, "Account created via Google", newUser.getUsername());
        } catch (Exception e) {
            return new AuthResponse(false, "Google authentication failed: " + e.getMessage(), null);
        }
    }
}
