package com.form.loader;

import com.form.entity.User;
import com.form.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataLoader {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostConstruct
    public void loadUsers() {

        if (userRepository.count() == 0) {

            userRepository.save(
                new User(null, "admin",
                    passwordEncoder.encode("admin123"), "ADMIN")
            );

            userRepository.save(
                new User(null, "user",
                    passwordEncoder.encode("user123"), "USER")
            );
            
            userRepository.save(new User(null, "saivardhan",
                    passwordEncoder.encode("Sai@1234"), "USER"));
        }
    }
}

