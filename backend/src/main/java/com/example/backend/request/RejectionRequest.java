package com.example.backend.request;

import lombok.Data;

@Data
public class RejectionRequest {
    private int jobId;
    private String rejectionComment;
}
