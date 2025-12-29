package com.form.repository;

import com.form.entity.ReactRegistration;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationRepository extends JpaRepository<ReactRegistration, Long> {

    boolean existsByOfficerId(String officerId);
}
