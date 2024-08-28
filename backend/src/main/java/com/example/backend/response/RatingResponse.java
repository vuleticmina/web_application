package com.example.backend.response;

import lombok.Data;

@Data
public class RatingResponse {
    private byte rating;
    private String comment;

    public RatingResponse(byte rating, String comment) {
        this.rating = rating;
        this.comment = comment;
    }
}
