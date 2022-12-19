package server.CRM.Building.Company.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.model.Customer;
import server.CRM.Building.Company.model.Revenues;
import server.CRM.Building.Company.repository.AddressRepository;
import server.CRM.Building.Company.repository.CustomerRepository;
import server.CRM.Building.Company.repository.ProjectRepository;
import server.CRM.Building.Company.repository.RevenueRepository;

import java.time.LocalDate;
import java.time.YearMonth;
import java.util.Date;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
public class RevenueController {

    // ------------- Constants -------------
    private static final Logger log = LoggerFactory.getLogger(RevenueController.class);
    @Autowired // This means to get the bean called customerRepository
    private RevenueRepository revenueRepository;

    @Autowired // This means to get the bean called customerRepository
    private CustomerRepository customerRepository;

    @Autowired // This means to get the bean called projectRepository
    private ProjectRepository projectRepository;

    @Autowired // This means to get the bean called addressRepository
    private AddressRepository addressRepository;

    // ------------- Routes -------------
    // Testing
    @GetMapping("/revenue/{monthsBack}")
    public List<Map<String, Object>> test1(@PathVariable long monthsBack){

        LocalDate lastTreeMonths = LocalDate.now().minusMonths(monthsBack);

        return revenueRepository.findRevenueAndDate(lastTreeMonths);
    }
    // End Testing




}
