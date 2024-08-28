package com.example.backend.controller;

import com.example.backend.model.entity.ArrangingEntity;
import com.example.backend.request.AcceptServicingRequest;
import com.example.backend.request.AssignmentRequest;
import com.example.backend.request.RatingRequest;
import com.example.backend.request.RejectionRequest;
import com.example.backend.response.*;
import com.example.backend.service.ArrangingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/arranging")
public class ArrangingController {
    @Autowired
    private ArrangingService arrangingService;

    @PostMapping("add")
    public ResponseEntity<Void> addArranging(@RequestBody ArrangingEntity arrangingEntity){
        this.arrangingService.addArranging(arrangingEntity);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("current/{id}")
    public ResponseEntity<ArrangingResponse> getCurrentArrangements(@PathVariable int id){
        ArrangingResponse currentArrangements = this.arrangingService.getCurrentArrangements(id);
        return new ResponseEntity<>(currentArrangements, HttpStatus.OK);
    }

    @GetMapping("past/{id}")
    public ResponseEntity<ArrangingResponse> getPastArrangements(@PathVariable int id){
        ArrangingResponse pastArrangements = this.arrangingService.getPastArrangements(id);
        return new ResponseEntity<>(pastArrangements, HttpStatus.OK);
    }

    @PostMapping("add-rating")
    public ResponseEntity<Void> addRating(@RequestBody RatingRequest ratingRequest){
        if(this.arrangingService.addRating(ratingRequest)){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PutMapping("cancel")
    public ResponseEntity<Void> cancelArranging(@RequestParam Integer id) {
        if(this.arrangingService.cancelArranging(id)){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("completed/{id}")
    public ResponseEntity<List<ArrangingEntity>> getAllCompletedArrangements(@PathVariable int id){
        List<ArrangingEntity> completedArrangements = this.arrangingService.getAllCompletedArrangements(id);
        return new ResponseEntity<>(completedArrangements, HttpStatus.OK);
    }

    @GetMapping("booked/{id}")
    public ResponseEntity<List<ArrangingEntity>> getAllBookedArrangementsForCompany(@PathVariable Integer id){
        List<ArrangingEntity> bookedArrangements = this.arrangingService.getAllBookedArrangementsForCompany(id);
        return new ResponseEntity<>(bookedArrangements, HttpStatus.OK);
    }

    @PostMapping("assign")
    public ResponseEntity<Void> assignTo(@RequestBody AssignmentRequest assignmentRequest){
        if(this.arrangingService.assignTo(assignmentRequest)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PostMapping("reject")
    public ResponseEntity<Void> reject(@RequestBody RejectionRequest rejectionRequest){
        if(this.arrangingService.rejectArranging(rejectionRequest)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @GetMapping("in-process/{id}")
    public ResponseEntity<List<ArrangingEntity>> getAllInProcessArrangementsForDecorator(@PathVariable Integer id){
        List<ArrangingEntity> inProcessArrangements = this.arrangingService.getAllInProcessArrangementsForDecorator(id);
        return new ResponseEntity<>(inProcessArrangements, HttpStatus.OK);
    }


    @PostMapping("upload")
    public ResponseEntity<Void> uploadPicture(@RequestParam int jobId,
                                              @RequestParam MultipartFile picture){
        if(this.arrangingService.uploadPicture(jobId, picture)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @PostMapping("book-servicing")
    public ResponseEntity<Void> bookServicing(@RequestParam int jobId){
        if(this.arrangingService.bookServicing(jobId)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping("servicing/{id}")
    public ResponseEntity<List<ArrangingEntity>> getServicingArranging(@PathVariable int id){
        List<ArrangingEntity> arrangements = this.arrangingService.getServicingArranging(id);
        return new ResponseEntity<>(arrangements, HttpStatus.OK);
    }

    @GetMapping("servicing-requests/{id}")
    public ResponseEntity<List<ArrangingEntity>> getServicingRequests(@PathVariable int id){
        List<ArrangingEntity> requests = this.arrangingService.getServicingRequests(id);
        return new ResponseEntity<>(requests, HttpStatus.OK);
    }

    @PostMapping("reject-servicing-request")
    public ResponseEntity<Void> rejectServicingRequest(@RequestParam int jobId){
        if(this.arrangingService.rejectServicingRequest(jobId)){
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }


    @PostMapping("accept-servicing-request")
    public ResponseEntity<Void> acceptServicingRequest(@RequestBody AcceptServicingRequest acceptServicingRequest){
        if(this.arrangingService.acceptServicingRequest(acceptServicingRequest)){
            return new ResponseEntity<>(HttpStatus.OK);
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);

    }

    @GetMapping("statistic/jobs-per-month/{id}")
    public ResponseEntity<List<JobsPerMonthResponse>> getJobsPerMonthForDecorator(@PathVariable int id){
        List<JobsPerMonthResponse> jobsPerMonth = this.arrangingService.getJobsPerMonthForDecorator(id);
        return new ResponseEntity<>(jobsPerMonth, HttpStatus.OK);
    }

    @GetMapping("statistic/jobs-per-decorator/{id}")
    public ResponseEntity<List<JobsPerDecoratorResponse>> getJobsPerDecoratorForCompany(@PathVariable int id){
        List<JobsPerDecoratorResponse> jobsPerDecorator = this.arrangingService.getJobsPerDecoratorForCompany(id);
        return new ResponseEntity<>(jobsPerDecorator, HttpStatus.OK);
    }

    @GetMapping("statistic/avg-jobs-per-weekday/{id}")
    public ResponseEntity<List<AvgJobsPerWeekday>> getAvgJobsPerWeekday(@PathVariable int id){
        List<AvgJobsPerWeekday> avgJobsPerWeekday = this.arrangingService.getAvgJobsPerWeekday(id);
        return new ResponseEntity<>(avgJobsPerWeekday, HttpStatus.OK);
    }

    @GetMapping("gallery")
    public ResponseEntity<List<byte[]>> getGallery(){
        List<byte[]> photos = this.arrangingService.getGallery();
        return new ResponseEntity<>(photos, HttpStatus.OK);
    }



}
