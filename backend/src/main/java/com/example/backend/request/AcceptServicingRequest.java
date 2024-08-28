package com.example.backend.request;

import lombok.Data;

import java.sql.Timestamp;

@Data
public class AcceptServicingRequest {
    private int jobId;
    private Timestamp estimatedCompletion;
}
