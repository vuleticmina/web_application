package com.example.backend.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class UserRequest {
    private String username;
    private String password;
    private String firstName;
    private String lastName;
    private String gender;
    private String address;
    private String phone;
    private String email;
    private MultipartFile profilePicture;
    private String creditCardNumber;
    private String role;
    private String registrationStatus;
    private Integer companyId;
    private String captchaToken;
}
