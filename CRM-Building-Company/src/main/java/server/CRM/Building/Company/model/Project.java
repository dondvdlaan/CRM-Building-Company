package server.CRM.Building.Company.model;

import javax.persistence.*;

@Entity // This tells JPA/Hibernate to make a table out of this class
public class Project {
    // region 0 Constants
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer projID;
    private String projTitle;
    private String projDesc;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn( name = "custid" )
    private Customer customer;

    // region 1 Constructors
    public Project() {
    }

    public Project(Integer projID, String projTitle, String projDesc, Customer customer) {
        this.projID = projID;
        this.projTitle = projTitle;
        this.projDesc = projDesc;
        this.customer = customer;
    }

    public Project(String projTitle, String projDesc) {
        this.projTitle = projTitle;
        this.projDesc = projDesc;
    }

    public Integer getProjID() {
        return projID;
    }

    public void setProjID(Integer projID) {
        this.projID = projID;
    }

    public String getProjTitle() {
        return projTitle;
    }

    public void setProjTitle(String projTitle) {
        this.projTitle = projTitle;
    }

    public String getProjDesc() {
        return projDesc;
    }

    public void setProjDesc(String projDesc) {
        this.projDesc = projDesc;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
}