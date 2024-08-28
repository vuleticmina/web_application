package com.example.backend.response;

import com.example.backend.model.entity.CompanyEntity;
import com.example.backend.model.entity.UserEntity;
import lombok.Data;

import java.util.List;

@Data
public class CompanyWithDecoratorsResponse {
    private CompanyEntity company;
    private List<UserEntity> decorators;
    private Double averageRating;

    public CompanyWithDecoratorsResponse(CompanyEntity company, List<UserEntity> decorators, Double averageRating) {
        this.company = company;
        this.decorators = decorators;
        this.averageRating = averageRating;
    }
}
