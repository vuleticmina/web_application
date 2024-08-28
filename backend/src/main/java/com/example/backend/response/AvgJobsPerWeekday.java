package com.example.backend.response;

import lombok.Data;

@Data
public class AvgJobsPerWeekday {
    private int weekday;
    private long avg;

    public AvgJobsPerWeekday(int weekday, long avg) {
        this.weekday = weekday;
        this.avg = avg;
    }
}
