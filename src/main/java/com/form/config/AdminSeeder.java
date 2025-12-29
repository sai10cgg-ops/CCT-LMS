package com.form.config;

import com.form.entity.User;
import com.form.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
@RequiredArgsConstructor
public class AdminSeeder implements CommandLineRunner {

    private final UserRepository repo;
    private final PasswordEncoder encoder;

    @Override
    public void run(String... args) throws Exception {

        if (!repo.existsByUsername("admin")) {

            User admin = User.builder()
                    .username("admin")
                    .password(encoder.encode("admin123"))
                    .role("ADMIN")
                    .build();

            repo.save(admin);

            System.out.println("Admin created successfully → username: admin | password: admin123");
        }
    }
}
