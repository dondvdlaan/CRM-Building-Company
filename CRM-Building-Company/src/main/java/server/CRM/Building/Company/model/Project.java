package server.CRM.Building.Company.model;

import javax.persistence.*;
import java.time.LocalDate;

@Entity // This tells JPA/Hibernate to make a table out of this class
public class Project {

    // *** Constants ***
    private static final int DEF_VALUE_INT = -1;
    private static final String DEF_VALUE_STR = ">nothingToSeeHere<";

    // *** Declaration and initialisation attributes ***
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
    private LocalDate projForecastOrderDate;
    private String projLostComment;
    // Cascade tells Hibernate to update table Address too
    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "addressID")
    private Address projAddress;
    // A customer assigned to this project with Foreign Key
    @ManyToOne
    @JoinColumn(name="custID")
    private Customer customer;

    // region 1 Constructors

    public Project() {
        this.projTitle = projTitle;
        this.projDesc = projDesc;
        this.projType = projType;
        this.projLand = projLand;
        this.projSurface = projSurface;
        this.projStart = projStart;
        this.projNote = projNote;
        this.projStatus = projStatus;
        this.projForecastOrderDate = LocalDate.now();
        this.projLostComment = projLostComment;
        this.projAddress = new Address();
        this.customer = new Customer();
    }


    // *** Getter und Setter ***
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

    public void setProjStart(String projStart) {
        this.projStart = projStart;
    }

    public String getProjNote() {
        return projNote;
    }

    public void setProjNote(String projNote) {
        this.projNote = projNote;
    }

    public String getProjStatus() {
        return projStatus;
    }

    public void setProjStatus(String projStatus) {
        this.projStatus = projStatus;
    }

    public LocalDate getProjForecastOrderDate() {
        return projForecastOrderDate;
    }

    public void setProjForecastOrderDate(LocalDate projForecastOrderDate) {
        this.projForecastOrderDate = projForecastOrderDate;
    }

    public String getProjLostComment() {
        return projLostComment;
    }

    public void setProjLostComment(String projLostComment) {
        this.projLostComment = projLostComment;
    }

    public Address getProjAddress() {
        return projAddress;
    }

    public void setProjAddress(Address projAddress) {
        this.projAddress = projAddress;
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
                ", projLand='" + projLand + '\'' +
                ", projSurface='" + projSurface + '\'' +
                ", projStart='" + projStart + '\'' +
                ", projNote='" + projNote + '\'' +
                ", projStatus='" + projStatus + '\'' +
                ", projForecastOrderDate=" + projForecastOrderDate +
                ", projLostComment='" + projLostComment + '\'' +
                ", projAddress=" + projAddress +
                ", customer=" + customer +
                '}';
    }
}