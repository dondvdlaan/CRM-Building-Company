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
    private String projType;
    private String projLand;
    private String projSurface;
    private String projStart;
    private String projNote;
    private String projStatus;
    private String projLostComment;
    private String projStreet;
    private String projHouseNumber;
    private String projZipCode;
    private String projCity;
    private String projCountry;

    // A customer can be assigned to only 1 project
    @OneToOne(cascade = CascadeType.REMOVE)
    @JoinColumn( name = "custid" )
    private Customer customer;

    // region 1 Constructors
    public Project() {
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

    public String getProjType() {
        return projType;
    }

    public void setProjType(String projType) {
        this.projType = projType;
    }

    public String getProjLand() {
        return projLand;
    }

    public void setProjLand(String projLand) {
        this.projLand = projLand;
    }

    public String getProjSurface() {
        return projSurface;
    }

    public void setProjSurface(String projSurface) {
        this.projSurface = projSurface;
    }

    public String getProjStart() {
        return projStart;
    }

    public String getProjLostComment() {
        return projLostComment;
    }

    public void setProjLostComment(String projLostComment) {
        this.projLostComment = projLostComment;
    }

    public void setProjStart(String projStart) {
        this.projStart = projStart;
    }

    public String getProjNote() {
        return projNote;
    }

    public void setProjNote(String projNote) {
        this.projNote = projNote;
    }

    public String getProjStreet() {
        return projStreet;
    }

    public void setProjStreet(String projStreet) {
        this.projStreet = projStreet;
    }

    public String getProjHouseNumber() {
        return projHouseNumber;
    }

    public void setProjHouseNumber(String projHouseNumber) {
        this.projHouseNumber = projHouseNumber;
    }

    public String getProjZipCode() {
        return projZipCode;
    }

    public void setProjZipCode(String projZipCode) {
        this.projZipCode = projZipCode;
    }

    public String getProjCity() {
        return projCity;
    }

    public void setProjCity(String projCity) {
        this.projCity = projCity;
    }

    public String getProjCountry() {
        return projCountry;
    }

    public void setProjCountry(String projCountry) {
        this.projCountry = projCountry;
    }

    public Customer getCustomer() {
       return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }

    public String getProjStatus() {
        return projStatus;
    }

    public void setProjStatus(String projStatus) {
        this.projStatus = projStatus;
    }

    @Override
    public String toString() {
        return "Project{" +
                "projID=" + projID +
                ", projTitle='" + projTitle + '\'' +
                ", projDesc='" + projDesc + '\'' +
                ", projType='" + projType + '\'' +
                ", projLand='" + projLand + '\'' +
                ", projSurface='" + projSurface + '\'' +
                ", projStart='" + projStart + '\'' +
                ", projNote='" + projNote + '\'' +
                ", projStatus='" + projStatus + '\'' +
                ", projLostComment='" + projLostComment + '\'' +
                ", projStreet='" + projStreet + '\'' +
                ", projHouseNumber='" + projHouseNumber + '\'' +
                ", projZipCode='" + projZipCode + '\'' +
                ", projCity='" + projCity + '\'' +
                ", projCountry='" + projCountry + '\'' +
                ", customer=" + customer +
                '}';
    }
}