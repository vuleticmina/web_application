package com.example.backend.repository;

import com.example.backend.model.entity.ArrangingEntity;
import com.example.backend.response.AvgJobsPerWeekday;
import com.example.backend.response.JobsPerDecoratorResponse;
import com.example.backend.response.JobsPerMonthResponse;
import com.example.backend.response.RatingResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

public interface ArrangingRepository extends JpaRepository<ArrangingEntity, Integer> {
    @Query("SELECT AVG(a.rating) FROM ArrangingEntity a WHERE a.companyId = :companyId")
    Double findAverageRatingByCompanyID(@Param("companyId") Integer companyId);

    @Query("SELECT new com.example.backend.response.RatingResponse(a.rating, a.comment) FROM ArrangingEntity a WHERE a.rating IS NOT NULL AND a.companyId = :companyId")
    public List<RatingResponse> findAllByCompanyId(int companyId);

    public List<ArrangingEntity> findByOwnerIdEqualsAndRealisationDateAfterOrderByRealisationDateAsc(int ownerId, Timestamp realisationDate);

    public List<ArrangingEntity> findByOwnerIdEqualsAndRealisationDateBeforeOrderByRealisationDateDesc(int ownerId, Timestamp realisationDate);

    public List<ArrangingEntity> findAllByStatusEqualsAndOwnerIdEquals(String status, int ownerId);

    public List<ArrangingEntity> findAllByStatusEqualsAndCompanyIdEqualsOrderByBookingDatetimeDesc(String status, int companyId);

    public List<ArrangingEntity> findAllByDecoratorIdEqualsAndRealisationDateBeforeAndPictureIsNull(Integer decoratorId, Timestamp realisationDate);

    public List<ArrangingEntity> findAllByDecoratorIdEqualsOrderByRealisationDateAsc(Integer decoratorId);

    List<ArrangingEntity> findAllByDecoratorIdEqualsAndStatusEqualsOrderByRealisationDateAsc(Integer decoratorId, String status);

    List<ArrangingEntity> findAllByOwnerIdEqualsAndServicingStatusEqualsOrLastServicingDateAfter(int ownerId, String servicingStatus, Timestamp lastServicingDate);

    List<ArrangingEntity> findAllByCompanyIdEqualsAndServicingStatusEquals(int companyId, String servicingStatus);





    @Query("SELECT new com.example.backend.response.JobsPerMonthResponse(MONTH(j.realisationDate), COUNT(j)) " +
            "FROM ArrangingEntity j " +
            "WHERE j.decoratorId = :decoratorId " +
            "GROUP BY MONTH(j.realisationDate) " +
            "ORDER BY MONTH(j.realisationDate)")
    List<JobsPerMonthResponse> findJobsPerMonthByDecoratorId(int decoratorId);


    @Query("SELECT new com.example.backend.response.JobsPerDecoratorResponse(u.username, COUNT(j)) " +
            "FROM ArrangingEntity j JOIN UserEntity u ON j.decoratorId = u.userId " +
            "WHERE j.companyId = :companyId " +
            "GROUP BY j.decoratorId " +
            "ORDER BY j.decoratorId")
    List<JobsPerDecoratorResponse> findJobsPerDecoratorByCompanyId(int companyId);

    @Query("SELECT new com.example.backend.response.AvgJobsPerWeekday(DAYOFWEEK(j.realisationDate), COUNT(j)) " +
            "FROM ArrangingEntity j " +
            "WHERE j.companyId = :companyId AND j.realisationDate >= :date24MonthsAgo " +
            "GROUP BY DAYOFWEEK(j.realisationDate) " +
            "ORDER BY DAYOFWEEK(j.realisationDate)")
    List<AvgJobsPerWeekday> findAvgJobsPerWeekdayByCompanyId(int companyId, LocalDateTime date24MonthsAgo);

    public long countAllByBookingDatetimeAfter(Timestamp bookingDatetime);


    @Query("SELECT j.picture FROM ArrangingEntity j WHERE j.picture != null")
    public List<byte[]> getGallery();


}

