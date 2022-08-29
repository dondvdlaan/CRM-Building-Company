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
    @OneToOne
    @JoinColumn(name = "custID")
    private Customer custID;

    // region 1 Constructors
    public Project(){ }

    public Project(String projTitle, String projDesc, Customer custID) {
        this.projTitle = projTitle;
        this.projDesc = projDesc;
        this.custID = custID;
    }

    // region 2 Getters and Setters

    public Integer getProjID() {
        return projID;
    }

    public String getProjTitle() {
        return projTitle;
    }
    public String getProjDesc() {
        return projDesc;
    }
    public Customer getCustID() {
        return custID;
    }

    public void setProjID(Integer projID) {
        this.projID = projID;
    }

    public void setProjTitle(String projTitle) {
        this.projTitle = projTitle;
    }

    public void setProjDesc(String projDesc) {
        this.projDesc = projDesc;
    }

    public void setCustID(Customer custID) {
        this.custID = custID;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projID=" + projID +
                ", projTitle='" + projTitle + '\'' +
                ", projDesc='" + projDesc + '\'' +
                ", custID='" + custID + '\'' +
                '}';
    }
}
