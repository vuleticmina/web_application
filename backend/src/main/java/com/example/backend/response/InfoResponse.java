package com.example.backend.response;

import lombok.Data;

@Data
public class InfoResponse {
    private long totalGardens;
    private long totalOwners;
    private long totalDecorators;
    private long reservationsLast24Hours;
    private long reservationsLast7Days;
    private long reservationsLast30Days;

    public InfoResponse(long totalGardens, long totalOwners, long totalDecorators, long reservationsLast24Hours,
                        long reservationsLast7Days, long reservationsLast30Days) {
        this.totalGardens = totalGardens;
        this.totalOwners = totalOwners;
        this.totalDecorators = totalDecorators;
        this.reservationsLast24Hours = reservationsLast24Hours;
        this.reservationsLast7Days = reservationsLast7Days;
        this.reservationsLast30Days = reservationsLast30Days;
    }
}
