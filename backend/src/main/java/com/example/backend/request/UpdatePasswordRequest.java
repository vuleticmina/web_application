package com.example.backend.request;

import lombok.Data;

@Data
public class UpdatePasswordRequest {
    private String username;
    private String oldPassword;
    private String newPassword;

}
