package com.example.backend.response;

import lombok.Data;

@Data
public class JobsPerDecoratorResponse {
    private String decorator;
    private long count;

    public JobsPerDecoratorResponse(String decorator, long count) {
        this.decorator = decorator;
        this.count = count;
    }
}
