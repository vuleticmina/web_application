package com.example.backend.service;

import com.example.backend.model.entity.CompanyEntity;
import com.example.backend.repository.CompanyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CompanyService {
    @Autowired
    private CompanyRepository companyRepository;

    public Integer addCompany(CompanyEntity company){
        companyRepository.save(company);
        return company.getCompanyId();
    }

    public List<CompanyEntity> getAllCompanies(){
        return companyRepository.findAll();
    }

    public List<CompanyEntity> getSortedCompanies(String name , String address, String sortBy, String order) {
        Specification<CompanyEntity> spec = Specification.where(null);

        if (name != null && !name.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("name"), "%" + name + "%"));
        }
        if (address != null && !address.isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.like(root.get("address"), "%" + address + "%"));
        }

        Sort sort = Sort.by(Sort.Direction.ASC, "name");
        if (sortBy != null && order != null) {
            Sort.Direction direction = "asc".equals(order) ? Sort.Direction.ASC : Sort.Direction.DESC;
            sort = Sort.by(direction, sortBy);
        }

        return companyRepository.findAll(spec, sort);
    }

    public CompanyEntity getCompanyById(Integer id){
        Optional<CompanyEntity> company = companyRepository.findById(id);
        return company.orElse(null);
    }


    }
