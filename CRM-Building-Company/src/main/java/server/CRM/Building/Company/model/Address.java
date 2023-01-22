package server.CRM.Building.Company.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

/**
 * Class for keeping address of customers and project sites
 */
@Entity
public class Address {
    // *** Constants ***
    private static final int DEF_VALUE_INT = -1;
    private static final String DEF_VALUE_STR = ">nothingToSeeHere<";

    // *** Declaration and initialisation attributes ***
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer addressID;
    private String addressStreet;
    private String addressHouseNumber;
    private String addressZipCode;
    private String addressCity;
    private String addressCountry;

    // *** Constructors ***

    public Address() {
        this.addressStreet = DEF_VALUE_STR;
        this.addressHouseNumber = DEF_VALUE_STR;
        this.addressZipCode = DEF_VALUE_STR;
        this.addressCity = DEF_VALUE_STR;
        this.addressCountry = DEF_VALUE_STR;
    }

    public Address(String addressStreet, String addressHouseNumber, String addressZipCode, String addressCity, String addressCountry) {
        this.addressStreet = addressStreet;
        this.addressHouseNumber = addressHouseNumber;
        this.addressZipCode = addressZipCode;
        this.addressCity = addressCity;
        this.addressCountry = addressCountry;
    }

    // For testing
    public Address(String addressStreet, String addressHouseNumber) {
        this.addressStreet = addressStreet;
        this.addressHouseNumber = addressHouseNumber;
    }
    // End testing

    // *** Getter und Setter ***

    public Integer getAddressID() {
        return addressID;
    }

    public void setAddressID(Integer addressID) {
        this.addressID = addressID;
    }

    public String getAddressStreet() {
        return addressStreet;
    }

    public void setAddressStreet(String addressStreet) {
        this.addressStreet = addressStreet;
    }

    public String getAddressHouseNumber() {
        return addressHouseNumber;
    }

    public void setAddressHouseNumber(String addressHouseNumber) {
        this.addressHouseNumber = addressHouseNumber;
    }

    public String getAddressZipCode() {
        return addressZipCode;
    }

    public void setAddressZipCode(String addressZipCode) {
        this.addressZipCode = addressZipCode;
    }

    public String getAddressCity() {
        return addressCity;
    }

    public void setAddressCity(String addressCity) {
        this.addressCity = addressCity;
    }

    public String getAddressCountry() {
        return addressCountry;
    }

    public void setAddressCountry(String addressCountry) {
        this.addressCountry = addressCountry;
    }

    @Override
    public String toString() {

        Class currentClass = getClass();

        return currentClass.getSimpleName()+ "{" +
                " addressID=" + addressID +
                ", addressStreet='" + addressStreet + '\'' +
                ", addressHouseNumber='" + addressHouseNumber + '\'' +
                ", addressZipCode='" + addressZipCode + '\'' +
                ", addressCity='" + addressCity + '\'' +
                ", addressCountry='" + addressCountry + '\'' +
                '}' ;
    }
}
