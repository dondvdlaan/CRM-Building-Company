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
    private Boolean projLand;
    private Double projSurface;
    private String projStart;
    private String projNote;
    private String projStreet;
    private String projHouseNumber;
    private String projZipCode;
    private String projCity;
    private String projCountry;

    // Each customer can be assigned to 1 project
    @OneToOne(cascade = CascadeType.ALL)
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

    public Boolean getProjLand() {
        return projLand;
    }

    public void setProjLand(Boolean projLand) {
        this.projLand = projLand;
    }

    public Double getProjSurface() {
        return projSurface;
    }

    public void setProjSurface(Double projSurface) {
        this.projSurface = projSurface;
    }

    public String getProjStart() {
        return projStart;
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

    @Override
    public String toString() {
        return "Project{" +
                "projID=" + projID +
                ", projTitle='" + projTitle + '\'' +
                ", projDesc='" + projDesc + '\'' +
                ", projType='" + projType + '\'' +
                ", projLand=" + projLand +
                ", projSurface=" + projSurface +
                ", projStart='" + projStart + '\'' +
                ", projNote='" + projNote + '\'' +
                ", projStreet='" + projStreet + '\'' +
                ", projHouseNumber='" + projHouseNumber + '\'' +
                ", projZipCode='" + projZipCode + '\'' +
                ", projCity='" + projCity + '\'' +
                ", projCountry='" + projCountry + '\'' +
                '}';
    }
}