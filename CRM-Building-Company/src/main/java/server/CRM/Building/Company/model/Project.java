package server.CRM.Building.Company.model;

import javax.persistence.*;

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
    private String projLostComment;
    // Cascade tells Hibernate to update table Address too
    @OneToOne(cascade = {CascadeType.ALL})
    @JoinColumn(name = "addressID")
    private Address projAddress;
    // A customer can be assigned to more projects. FK here at project
    @ManyToOne()
    @JoinColumn(name = "custID")
    private Customer projCustomer;

    // region 1 Constructors
    public Project(){
        this.projTitle = DEF_VALUE_STR;
        this.projDesc = DEF_VALUE_STR;
        this.projType = DEF_VALUE_STR;
        this.projLand = DEF_VALUE_STR;
        this.projSurface = DEF_VALUE_STR;
        this.projStart = DEF_VALUE_STR;
        this.projNote = DEF_VALUE_STR;
        this.projStatus = DEF_VALUE_STR;
        this.projLostComment = DEF_VALUE_STR;
        this.projAddress = new Address();
        this.projCustomer = new Customer();
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

    public Customer getProjCustomer() {
        return projCustomer;
    }

    public void setProjCustomer(Customer projCustomer) {
        this.projCustomer = projCustomer;
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
                ", projAddress=" + projAddress +
                ", projCustomer=" + projCustomer +
                '}';
    }
}