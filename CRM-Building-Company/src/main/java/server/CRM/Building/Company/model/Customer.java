package server.CRM.Building.Company.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity // This tells JPA/Hibernate to make a table out of this class
public class Customer {

    // *** Constants ***
    private static final int DEF_VALUE_INT = -1;
    private static final String DEF_VALUE_STR = ">nothingToSeeHere<";

    // *** Declaration and initialisation attributes ***
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer custID;
    private String custFirstName;
    private String custLastName;
    private String custEmail;
    private String custTel;
    // Cascade tells Hibernate to update table Address too
    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "addressID")
    private Address custAddress;
    private LocalDate custRegistrationDate;

    @OneToMany
    //@JoinColumn(name = "custID")
    private List<Project> custProjects;


    // region 1 Constructors
    // For the sake of JPA
    public Customer(){
        this.custFirstName = DEF_VALUE_STR;
        this.custLastName = DEF_VALUE_STR;
        this.custEmail = DEF_VALUE_STR;
        this.custTel = DEF_VALUE_STR;
        this.custAddress = new Address();
        this.custRegistrationDate = LocalDate.now();
        this.custProjects = new ArrayList<>();
    }
    // *** Getter und Setter ***

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

    public Address getCustAddress() {
        return custAddress;
    }

    public void setCustAddress(Address custAddress) {
        this.custAddress = custAddress;
    }

    public LocalDate getCustRegistrationDate() {
        return custRegistrationDate;
    }

    public void setCustRegistrationDate(LocalDate custRegistrationDate) {
        this.custRegistrationDate = custRegistrationDate;
    }

    public List<Project> getCustProjects() {
        return custProjects;
    }

    public void setCustProjects(List<Project> custProjects) {
        this.custProjects = custProjects;
    }

    @Override
    public String toString() {
        return "Customer{" +
                "custID=" + custID +
                ", custFirstName='" + custFirstName + '\'' +
                ", custLastName='" + custLastName + '\'' +
                ", custEmail='" + custEmail + '\'' +
                ", custTel='" + custTel + '\'' +
                ", address=" + custAddress +
                ", custRegistrationDate=" + custRegistrationDate +
                ", project=" + custProjects +
                '}';
    }
}
