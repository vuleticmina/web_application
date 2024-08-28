package com.example.backend.repository;

import com.example.backend.model.entity.CompanyEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CompanyRepository extends JpaRepository<CompanyEntity, Integer>, JpaSpecificationExecutor<CompanyEntity> {
    @Query("SELECT c.name FROM CompanyEntity c WHERE c.companyId = :companyId")
    String findCompanyNameByCompanyId(@Param("companyId") Integer companyId);

}
