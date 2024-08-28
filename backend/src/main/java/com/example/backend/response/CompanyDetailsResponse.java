package com.example.backend.response;

import com.example.backend.model.entity.CompanyEntity;
import lombok.Data;

import java.util.List;

@Data
public class CompanyDetailsResponse {
    private CompanyEntity company;
    private List<RatingResponse> ratings;

    public CompanyDetailsResponse(CompanyEntity company, List<RatingResponse> ratings) {
        this.company = company;
        this.ratings = ratings;
    }
}
