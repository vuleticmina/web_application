package com.example.backend.response;

import lombok.Data;

@Data
public class JobsPerMonthResponse {
    private int month;
    private Long count;

    public JobsPerMonthResponse(int month, Long count) {
        this.month = month;
        this.count = count;
    }
}
