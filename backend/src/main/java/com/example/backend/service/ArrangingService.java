package com.example.backend.service;
import com.example.backend.model.entity.ArrangingEntity;
import com.example.backend.model.enums.ArrangingStatus;
import com.example.backend.model.enums.ServicingStatus;
import com.example.backend.model.enums.UserRegistrationStatus;
import com.example.backend.model.enums.UserType;
import com.example.backend.repository.ArrangingRepository;
import com.example.backend.repository.CompanyRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.request.AcceptServicingRequest;
import com.example.backend.request.AssignmentRequest;
import com.example.backend.request.RatingRequest;
import com.example.backend.request.RejectionRequest;
import com.example.backend.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Timestamp;
import java.time.Instant;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ArrangingService {
    @Autowired
    private ArrangingRepository arrangingRepository;

    @Autowired
    private CompanyRepository companyRepository;


    public Double getAverageRatingForCompany(Integer companyId){
        return this.arrangingRepository.findAverageRatingByCompanyID(companyId);
    }

    public List<RatingResponse> getAllRatingsForCompany(Integer companyId) {
        return this.arrangingRepository.findAllByCompanyId(companyId);
    }

    public void addArranging(ArrangingEntity arranging){
        this.arrangingRepository.save(arranging);
    }

    public ArrangingResponse getCurrentArrangements(int ownerId){
        List<String> companyNames = new ArrayList<>();
        List<ArrangingEntity> bookings = this.arrangingRepository.findByOwnerIdEqualsAndRealisationDateAfterOrderByRealisationDateAsc(ownerId, Timestamp.valueOf(LocalDateTime.now()));
        bookings.forEach(
                arrangingEntity -> {
                    String companyName = this.companyRepository.findCompanyNameByCompanyId(arrangingEntity.getCompanyId());
                    companyNames.add(companyName);
                }
        );

        return new ArrangingResponse(bookings, companyNames);
    }

    public ArrangingResponse getPastArrangements(int ownerId){
        List<String> companyNames = new ArrayList<>();
        List<ArrangingEntity> bookings = this.arrangingRepository.findByOwnerIdEqualsAndRealisationDateBeforeOrderByRealisationDateDesc(ownerId, Timestamp.valueOf(LocalDateTime.now()));
        bookings.forEach(
                arrangingEntity -> {
                    String companyName = this.companyRepository.findCompanyNameByCompanyId(arrangingEntity.getCompanyId());
                    companyNames.add(companyName);
                }
        );

        return new ArrangingResponse(bookings, companyNames);
    }

    public boolean addRating(RatingRequest ratingRequest){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(ratingRequest.getJobId());
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setRating(ratingRequest.getRating());
            arranging.setComment(ratingRequest.getComment());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;

    }

    public boolean cancelArranging(Integer id){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(id);
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setStatus(ArrangingStatus.CANCELED.toString());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;

    }

    public List<ArrangingEntity> getAllCompletedArrangements(Integer ownerId){
        return this.arrangingRepository.findAllByStatusEqualsAndOwnerIdEquals(ArrangingStatus.COMPLETED.toString(), ownerId);
    }

    public List<ArrangingEntity> getAllBookedArrangementsForCompany(Integer companyId){
        return this.arrangingRepository.findAllByStatusEqualsAndCompanyIdEqualsOrderByBookingDatetimeDesc(ArrangingStatus.BOOKED.toString(), companyId);
    }

    public List<ArrangingEntity> getAllInProcessArrangementsForDecorator(Integer decoratorId){
        return this.arrangingRepository.findAllByDecoratorIdEqualsAndStatusEqualsOrderByRealisationDateAsc(decoratorId, ArrangingStatus.IN_PROCESS.toString());
    }

    public boolean assignTo(AssignmentRequest assignmentRequest){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(assignmentRequest.getJobId());
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setDecoratorId(assignmentRequest.getDecoratorId());
            arranging.setStatus(ArrangingStatus.IN_PROCESS.toString());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;
    }

    public boolean rejectArranging(RejectionRequest rejectionRequest){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(rejectionRequest.getJobId());
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setStatus(ArrangingStatus.REJECTED.toString());
            arranging.setRejectionComment(rejectionRequest.getRejectionComment());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;

    }


    public boolean uploadPicture(int jobId, MultipartFile picture){
        try {
            Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(jobId);
            if(optionalArranging.isPresent()){
                ArrangingEntity arranging = optionalArranging.get();
                arranging.setPicture(picture.getBytes());
                arranging.setStatus(ArrangingStatus.COMPLETED.toString());
                this.arrangingRepository.save(arranging);
                return true;
            }
            return false;

        } catch (IOException e) {
            return false;

        }
    }

    public boolean bookServicing(int jobId){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(jobId);
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setServicingStatus(ServicingStatus.BOOKED.toString());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;
    }

    public List<ArrangingEntity> getServicingArranging(int ownerId) {
        return this.arrangingRepository.findAllByOwnerIdEqualsAndServicingStatusEqualsOrLastServicingDateAfter(ownerId, ServicingStatus.BOOKED.toString(), Timestamp.from(Instant.now()));
    }

    public List<ArrangingEntity> getServicingRequests(int companyId){
        return this.arrangingRepository.findAllByCompanyIdEqualsAndServicingStatusEquals(companyId, ServicingStatus.BOOKED.toString());
    }

    public boolean rejectServicingRequest(int jobId){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(jobId);
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setServicingStatus(ServicingStatus.REJECTED.toString());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;
    }

    public boolean acceptServicingRequest(AcceptServicingRequest acceptServicingRequest){
        Optional<ArrangingEntity> optionalArranging = this.arrangingRepository.findById(acceptServicingRequest.getJobId());
        if(optionalArranging.isPresent()){
            ArrangingEntity arranging = optionalArranging.get();
            arranging.setServicingStatus(ServicingStatus.ACCEPTED.toString());
            arranging.setLastServicingDate(acceptServicingRequest.getEstimatedCompletion());
            this.arrangingRepository.save(arranging);
            return true;
        }

        return false;
    }

    public List<JobsPerMonthResponse> getJobsPerMonthForDecorator(int decoratorId){
        return this.arrangingRepository.findJobsPerMonthByDecoratorId(decoratorId);
    }



    public List<JobsPerDecoratorResponse> getJobsPerDecoratorForCompany(int companyId){
        return this.arrangingRepository.findJobsPerDecoratorByCompanyId(companyId);
    }


    public List<AvgJobsPerWeekday> getAvgJobsPerWeekday(int companyId){
        return this.arrangingRepository.findAvgJobsPerWeekdayByCompanyId(companyId, LocalDateTime.now().minusMonths(24));
    }

    public long totalGardens(){
        return this.arrangingRepository.count();
    }

    public long reservationsLast24Hours(){
        return this.arrangingRepository.countAllByBookingDatetimeAfter(Timestamp.valueOf(LocalDateTime.now().minusHours(24)));
    }

    public long reservationsLast7Days(){
        return this.arrangingRepository.countAllByBookingDatetimeAfter(Timestamp.valueOf(LocalDateTime.now().minusDays(7)));
    }

    public long reservationsLast30Days(){
        return this.arrangingRepository.countAllByBookingDatetimeAfter(Timestamp.valueOf(LocalDateTime.now().minusDays(30)));
    }

    public List<byte[]> getGallery(){
        return this.arrangingRepository.getGallery();
    }


}
