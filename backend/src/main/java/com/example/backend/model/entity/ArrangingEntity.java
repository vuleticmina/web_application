package com.example.backend.model.entity;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.sql.Timestamp;
import java.util.Arrays;
import java.util.Objects;

@Entity
@Table(name = "arranging", schema = "your_imagination_your_garden", catalog = "")
public class ArrangingEntity {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    @Column(name = "job_id")
    private int jobId;
    @Basic
    @Column(name = "owner_id")
    private int ownerId;
    @Basic
    @Column(name = "company_id")
    private int companyId;
    @Basic
    @Column(name = "decorator_id")
    private Integer decoratorId;
    @Basic
    @Column(name = "booking_datetime")
    private Timestamp bookingDatetime;
    @Basic
    @Column(name = "realisation_date")
    private Timestamp realisationDate;
    @Basic
    @Column(name = "last_servicing_date")
    private Timestamp lastServicingDate;
    @Basic
    @Column(name = "area")
    private BigDecimal area;
    @Basic
    @Column(name = "type")
    private String type;
    @Basic
    @Column(name = "pool_area")
    private BigDecimal poolArea;
    @Basic
    @Column(name = "green_area")
    private BigDecimal greenArea;
    @Basic
    @Column(name = "fountain_area")
    private BigDecimal fountainArea;
    @Basic
    @Column(name = "furniture_area")
    private BigDecimal furnitureArea;
    @Basic
    @Column(name = "tables_number")
    private Integer tablesNumber;
    @Basic
    @Column(name = "chairs_number")
    private Integer chairsNumber;
    @Basic
    @Column(name = "additional_requirements")
    private String additionalRequirements;
    @Basic
    @Column(name = "layout")
    private String layout;
    @Basic
    @Column(name = "options")
    private String options;
    @Basic
    @Column(name = "vacations")
    private String vacations;
    @Basic
    @Column(name = "status")
    private String status;
    @Basic
    @Column(name = "servicing_status")
    private String servicingStatus;
    @Basic
    @Column(name = "rating")
    private Byte rating;
    @Basic
    @Column(name = "comment")
    private String comment;
    @Basic
    @Column(name = "rejection_comment")
    private String rejectionComment;
    @Basic
    @Column(name = "picture")
    private byte[] picture;

    public int getJobId() {
        return jobId;
    }

    public void setJobId(int jobId) {
        this.jobId = jobId;
    }

    public int getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(int ownerId) {
        this.ownerId = ownerId;
    }

    public int getCompanyId() {
        return companyId;
    }

    public void setCompanyId(int companyId) {
        this.companyId = companyId;
    }

    public Integer getDecoratorId() {
        return decoratorId;
    }

    public void setDecoratorId(Integer decoratorId) {
        this.decoratorId = decoratorId;
    }

    public Timestamp getBookingDatetime() {
        return bookingDatetime;
    }

    public void setBookingDatetime(Timestamp bookingDatetime) {
        this.bookingDatetime = bookingDatetime;
    }

    public Timestamp getRealisationDate() {
        return realisationDate;
    }

    public void setRealisationDate(Timestamp realisationDate) {
        this.realisationDate = realisationDate;
    }

    public Timestamp getLastServicingDate() {
        return lastServicingDate;
    }

    public void setLastServicingDate(Timestamp lastServicingDate) {
        this.lastServicingDate = lastServicingDate;
    }

    public BigDecimal getArea() {
        return area;
    }

    public void setArea(BigDecimal area) {
        this.area = area;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public BigDecimal getPoolArea() {
        return poolArea;
    }

    public void setPoolArea(BigDecimal poolArea) {
        this.poolArea = poolArea;
    }

    public BigDecimal getGreenArea() {
        return greenArea;
    }

    public void setGreenArea(BigDecimal greenArea) {
        this.greenArea = greenArea;
    }

    public BigDecimal getFountainArea() {
        return fountainArea;
    }

    public void setFountainArea(BigDecimal fountainArea) {
        this.fountainArea = fountainArea;
    }

    public BigDecimal getFurnitureArea() {
        return furnitureArea;
    }

    public void setFurnitureArea(BigDecimal furnitureArea) {
        this.furnitureArea = furnitureArea;
    }

    public Integer getTablesNumber() {
        return tablesNumber;
    }

    public void setTablesNumber(Integer tablesNumber) {
        this.tablesNumber = tablesNumber;
    }

    public Integer getChairsNumber() {
        return chairsNumber;
    }

    public void setChairsNumber(Integer chairsNumber) {
        this.chairsNumber = chairsNumber;
    }

    public String getAdditionalRequirements() {
        return additionalRequirements;
    }

    public void setAdditionalRequirements(String additionalRequirements) {
        this.additionalRequirements = additionalRequirements;
    }

    public String getLayout() {
        return layout;
    }

    public void setLayout(String layout) {
        this.layout = layout;
    }

    public String getOptions() {
        return options;
    }

    public void setOptions(String options) {
        this.options = options;
    }

    public String getVacations() {
        return vacations;
    }

    public void setVacations(String vacations) {
        this.vacations = vacations;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getServicingStatus() {
        return servicingStatus;
    }

    public void setServicingStatus(String servicingStatus) {
        this.servicingStatus = servicingStatus;
    }

    public Byte getRating() {
        return rating;
    }

    public void setRating(Byte rating) {
        this.rating = rating;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getRejectionComment() {
        return rejectionComment;
    }

    public void setRejectionComment(String rejectionComment) {
        this.rejectionComment = rejectionComment;
    }

    public byte[] getPicture() {
        return picture;
    }

    public void setPicture(byte[] picture) {
        this.picture = picture;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        ArrangingEntity arranging = (ArrangingEntity) o;
        return jobId == arranging.jobId && ownerId == arranging.ownerId && companyId == arranging.companyId && Objects.equals(decoratorId, arranging.decoratorId) && Objects.equals(bookingDatetime, arranging.bookingDatetime) && Objects.equals(realisationDate, arranging.realisationDate) && Objects.equals(lastServicingDate, arranging.lastServicingDate) && Objects.equals(area, arranging.area) && Objects.equals(type, arranging.type) && Objects.equals(poolArea, arranging.poolArea) && Objects.equals(greenArea, arranging.greenArea) && Objects.equals(fountainArea, arranging.fountainArea) && Objects.equals(furnitureArea, arranging.furnitureArea) && Objects.equals(tablesNumber, arranging.tablesNumber) && Objects.equals(chairsNumber, arranging.chairsNumber) && Objects.equals(additionalRequirements, arranging.additionalRequirements) && Objects.equals(layout, arranging.layout) && Objects.equals(options, arranging.options) && Objects.equals(vacations, arranging.vacations) && Objects.equals(status, arranging.status) && Objects.equals(servicingStatus, arranging.servicingStatus) && Objects.equals(rating, arranging.rating) && Objects.equals(comment, arranging.comment) && Objects.equals(rejectionComment, arranging.rejectionComment) && Arrays.equals(picture, arranging.picture);
    }

    @Override
    public int hashCode() {
        int result = Objects.hash(jobId, ownerId, companyId, decoratorId, bookingDatetime, realisationDate, lastServicingDate, area, type, poolArea, greenArea, fountainArea, furnitureArea, tablesNumber, chairsNumber, additionalRequirements, layout, options, vacations, status, servicingStatus, rating, comment, rejectionComment);
        result = 31 * result + Arrays.hashCode(picture);
        return result;
    }
}
