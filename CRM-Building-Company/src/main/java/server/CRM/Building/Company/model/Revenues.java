package server.CRM.Building.Company.model;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Entity // This tells JPA/Hibernate to make a table out of this class
public class Revenues {

    // *** Constants ***
    private static final int DEF_VALUE_INT = -1;
    private static final double DEF_VALUE_DOUBLE = -1D;
    private static final String DEF_VALUE_STR = ">nothingToSeeHere<";

    // *** Declaration and initialisation attributes ***
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer revenueID;
    private double revenueAmount;
    private LocalDate revenueDate;
    private Integer projID;

    // region 1 Constructors
    // For the sake of JPA

    public Revenues() {
        this.revenueID = DEF_VALUE_INT;
        this.revenueAmount = DEF_VALUE_DOUBLE;
        this.revenueDate = LocalDate.now();
        this.projID = DEF_VALUE_INT;
    }

    public Revenues(double revenueAmount, LocalDate revenueDate, Integer projID) {
        this.revenueAmount = revenueAmount;
        this.revenueDate = revenueDate;
        this.projID = projID;
    }
    // *** Getter und Setter ***

    public Integer getRevenueID() {
        return revenueID;
    }

    public void setRevenueID(Integer revenueID) {
        this.revenueID = revenueID;
    }

    public double getRevenueAmount() {
        return revenueAmount;
    }

    public void setRevenueAmount(double revenueAmount) {
        this.revenueAmount = revenueAmount;
    }

    public LocalDate getRevenueDate() {
        return revenueDate;
    }

    public void setRevenueDate(LocalDate revenueDate) {
        this.revenueDate = revenueDate;
    }

    public Integer getProjID() {
        return projID;
    }

    public void setProjID(Integer projID) {
        this.projID = projID;
    }

    @Override
    public String toString() {
        return "Revenues{" +
                "revenueID=" + revenueID +
                ", revenueAmount=" + revenueAmount +
                ", revenueDate=" + revenueDate +
                ", projID=" + projID +
                '}';
    }
}
