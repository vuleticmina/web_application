package com.example.backend.request;

import lombok.Data;

@Data
public class RatingRequest {
    private byte rating;
    private String comment;
    private int jobId;

    public RatingRequest(byte rating, String comment, int jobId) {
        this.rating = rating;
        this.comment = comment;
        this.jobId = jobId;
    }
}
