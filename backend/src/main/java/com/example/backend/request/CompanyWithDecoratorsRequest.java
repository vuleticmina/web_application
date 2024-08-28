package com.example.backend.request;

import com.example.backend.model.entity.CompanyEntity;
import lombok.Data;

import java.util.List;

@Data
public class CompanyWithDecoratorsRequest {
    private CompanyEntity company;
    private List<String> decorators;
}
