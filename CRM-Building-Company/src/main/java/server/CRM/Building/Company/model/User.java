package server.CRM.Building.Company.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;

@Entity // This tells JPA/Hibernate to make a table out of this class
public class User {
    // region 0 Constants
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer userID;
    private String userFirstName;
    private String userLastName;
    private String userEmail;
    private String userPW;

    // region 1 Constructors
    // For the sake of JPA
    public User(){}

    public User(Integer userID, String userFirstName, String userLastName, String userEmail, String userPW) {
        this.userID = userID;
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userPW = userPW;
    }

    public User(String userFirstName, String userLastName, String userEmail, String userPW) {
        this.userFirstName = userFirstName;
        this.userLastName = userLastName;
        this.userEmail = userEmail;
        this.userPW = userPW;
    }

    // region 2 Getters and Setters
    public Integer getUserID() {
        return userID;
    }

    public void setUserID(Integer userID) {
        this.userID = userID;
    }

    public String getUserFirstName() {
        return userFirstName;
    }

    public void setUserFirstName(String userFirstName) {
        this.userFirstName = userFirstName;
    }

    public String getUserLastName() {
        return userLastName;
    }

    public void setUserLastName(String userLastName) {
        this.userLastName = userLastName;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public String getUserPW() {
        return userPW;
    }

    public void setUserPW(String userPW) {
        this.userPW = userPW;
    }

    @Override
    public String toString() {
        return "User{" +
                "userID=" + userID +
                ", userFirstName='" + userFirstName + '\'' +
                ", userLastName='" + userLastName + '\'' +
                ", userEmail='" + userEmail + '\'' +
                ", userPW='" + userPW + '\'' +
                '}';
    }
}
