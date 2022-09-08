package server.CRM.Building.Company.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity // This tells JPA/Hibernate to make a table out of this class
public class Customer {
    // region 0 Constants
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer custID;
    private String custFirstName;
    private String custLastName;
    private String custEmail;
    private String custTel;
    private String custStreet;
    private String custHouseNumber;
    private String custZipCode;
    private String custCity;
    private String custCountry;
    @CreationTimestamp
    private Timestamp custRegistrationDate;

    //W mappedBy we create bidirectional relationship
    @OneToMany(mappedBy = "customer",  orphanRemoval = false, fetch=FetchType.LAZY)
    @JsonIgnore
    private List<Project> project;


    // region 1 Constructors
    // For the sake of JPA
    public Customer(){}

    public Customer(Integer custID, String custFirstName, String custLastName, String custEmail, String custTel, String custStreet, String custHouseNumber, String custZipCode, String custCity, String custCountry, Timestamp custRegistrationDate) {
        this.custID = custID;
        this.custFirstName = custFirstName;
        this.custLastName = custLastName;
        this.custEmail = custEmail;
        this.custTel = custTel;
        this.custStreet = custStreet;
        this.custHouseNumber = custHouseNumber;
        this.custZipCode = custZipCode;
        this.custCity = custCity;
        this.custCountry = custCountry;
        this.custRegistrationDate = custRegistrationDate;
    }

    public Customer(String custFirstName, String custLastName, String custEmail) {
        this.custFirstName = custFirstName;
        this.custLastName = custLastName;
        this.custEmail = custEmail;
    }

    // region 2 Getters and Setters

    public Integer getCustID() {
        return custID;
    }

    public void setCustID(Integer custID) {
        this.custID = custID;
    }

    public String getCustFirstName() {
        return custFirstName;
    }

    public void setCustFirstName(String custFirstName) {
        this.custFirstName = custFirstName;
    }

    public String getCustLastName() {
        return custLastName;
    }

    public void setCustLastName(String custLastName) {
        this.custLastName = custLastName;
    }

    public String getCustEmail() {
        return custEmail;
    }

    public void setCustEmail(String custEmail) {
        this.custEmail = custEmail;
    }

    public String getCustTel() {
        return custTel;
    }

    public void setCustTel(String custTel) {
        this.custTel = custTel;
    }

    public String getCustStreet() {
        return custStreet;
    }

    public void setCustStreet(String custStreet) {
        this.custStreet = custStreet;
    }

    public String getCustHouseNumber() {
        return custHouseNumber;
    }

    public void setCustHouseNumber(String custHouseNumber) {
        this.custHouseNumber = custHouseNumber;
    }

    public String getCustZipCode() {
        return custZipCode;
    }

    public void setCustZipCode(String custZipCode) {
        this.custZipCode = custZipCode;
    }

    public String getCustCity() {
        return custCity;
    }

    public void setCustCity(String custCity) {
        this.custCity = custCity;
    }

    public String getCustCountry() {
        return custCountry;
    }

    public void setCustCountry(String custCountry) {
        this.custCountry = custCountry;
    }

    public Timestamp getCustRegistrationDate() {
        return custRegistrationDate;
    }

    public void setCustRegistrationDate(Timestamp custRegistrationDate) {
        this.custRegistrationDate = custRegistrationDate;
    }

    public List<Project> getProject() {
        return project;
    }

    public void setProject(List<Project> project) {
        this.project = project;
    }
    // region 3 toString

    @Override
    public String toString() {
        return "Customer{" +
                "custID=" + custID +
                ", custFirstName='" + custFirstName + '\'' +
                ", custLastName='" + custLastName + '\'' +
                ", custEmail='" + custEmail + '\'' +
                ", custTel='" + custTel + '\'' +
                ", custStreet='" + custStreet + '\'' +
                ", custHouseNumber='" + custHouseNumber + '\'' +
                ", custZipCode='" + custZipCode + '\'' +
                ", custCity='" + custCity + '\'' +
                ", custCountry='" + custCountry + '\'' +
                ", custRegistrationDate=" + custRegistrationDate +
                '}';
    }
}
