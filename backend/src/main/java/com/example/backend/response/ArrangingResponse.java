package com.example.backend.response;

import com.example.backend.model.entity.ArrangingEntity;
import lombok.Data;

import java.util.List;

@Data
public class ArrangingResponse {
    private List<ArrangingEntity> bookings;
    private List<String> companyNames;

    public ArrangingResponse(List<ArrangingEntity> bookings, List<String> companyNames) {
        this.bookings = bookings;
        this.companyNames = companyNames;
    }
}
