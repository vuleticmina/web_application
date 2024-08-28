package com.example.backend.repository;

import com.example.backend.model.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface
UserRepository extends JpaRepository<UserEntity, Integer> {
    public UserEntity findByUsernameEquals(String username);

    public UserEntity findByEmailEquals(String email);

    public List<UserEntity> findAllByRegistrationStatusEquals(String registrationStatus);


    public List<UserEntity> findAllByRegistrationStatusEqualsAndRoleEquals(String registrationStatus, String role);

    public List<UserEntity> findAllByRoleAndCompanyIdIsNull(String role);

    public List<UserEntity> findAllByCompanyId(Integer companyId);

    public Long countAllByRoleEquals(String role);



}
