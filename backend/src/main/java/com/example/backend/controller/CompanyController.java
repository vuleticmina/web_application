package com.example.backend.controller;


import com.example.backend.model.entity.CompanyEntity;
import com.example.backend.request.CompanyWithDecoratorsRequest;
import com.example.backend.response.CompanyDetailsResponse;
import com.example.backend.response.CompanyWithDecoratorsResponse;
import com.example.backend.service.ArrangingService;
import com.example.backend.service.CompanyService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("api/company")
public class CompanyController {
    @Autowired
    private CompanyService companyService;

    @Autowired
    private UserService userService;

    @Autowired
    private ArrangingService arrangingService;

    @PostMapping("add")
    public ResponseEntity<Integer> addCompany(@RequestBody CompanyWithDecoratorsRequest companyRequest){
        int companyId = companyService.addCompany(companyRequest.getCompany());
        companyRequest.getDecorators().forEach(
                decorator ->{
                    userService.setCompanyId(decorator, companyId);
                }
        );
        return new ResponseEntity<>(companyId, HttpStatus.OK);

    }

    @GetMapping("all")
    public ResponseEntity<List<CompanyEntity>> getAllCompanies(){
        List<CompanyEntity> companies = companyService.getAllCompanies();
        return new ResponseEntity<>(companies, HttpStatus.OK);

    }

    @GetMapping("with-decorators")
    public ResponseEntity<List<CompanyWithDecoratorsResponse>> getCompaniesWithDecorators(@RequestParam(required = false) String name,
                                                                                          @RequestParam(required = false) String address,
                                                                                          @RequestParam(required = false) String sortBy,
                                                                                          @RequestParam(required = false) String order) {
        List<CompanyWithDecoratorsResponse> companiesWithDecorators = new ArrayList<>();
        companyService.getSortedCompanies(name, address, sortBy, order).forEach(
                company -> {
                    Integer companyId = company.getCompanyId();
                    Double avgRating = this.arrangingService.getAverageRatingForCompany(companyId);
                    companiesWithDecorators.add(new CompanyWithDecoratorsResponse(company, userService.getAllDecoratorFromCompany(companyId), avgRating!=null?avgRating:0));
                }
        );
        return ResponseEntity.ok(companiesWithDecorators);
    }

    @GetMapping("/{id}")
    public ResponseEntity<CompanyDetailsResponse> getCompany(@PathVariable Integer id) {
        CompanyDetailsResponse companyDetailsResponse = new CompanyDetailsResponse(companyService.getCompanyById(id), arrangingService.getAllRatingsForCompany(id));
        return ResponseEntity.ok(companyDetailsResponse);
    }
}
