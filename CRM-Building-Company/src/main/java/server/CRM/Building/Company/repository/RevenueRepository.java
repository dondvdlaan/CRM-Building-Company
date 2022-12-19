package server.CRM.Building.Company.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Revenues;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Map;

// This will be AUTO IMPLEMENTED by Spring into a Bean called RevenueRepository
// CRUD refers Create, Read, Update, Delete

public interface RevenueRepository extends CrudRepository<Revenues, Integer> {

    @Query(
            value = "Select r.revenue_amount, r.revenue_date from revenues r " +
            "where r.revenue_date >= :lastTreeMonths ",
            nativeQuery = true
    )

    List<Map<String, Object>> findRevenueAndDate(@Param ("lastTreeMonths") LocalDate lastTreeMonths );
}
