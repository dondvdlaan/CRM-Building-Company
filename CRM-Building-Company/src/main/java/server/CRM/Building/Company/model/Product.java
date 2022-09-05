package server.CRM.Building.Company.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Optional;

@Entity // This tells Hibernate to make a table out of this class
public class Product {
    // region 0 Constants
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer prodID;
    private String productItem;
    private String productDescription;
    private String productDetails;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn( name = "custid" )
    private Customer customer;

    // region 1 Constructor
    public Product(){ }


    // region 2 Getters and Setters


    public Integer getProdID() {
        return prodID;
    }

    public void setProdID(Integer prodID) {
        this.prodID = prodID;
    }

    public String getProductItem() {
        return productItem;
    }

    public void setProductItem(String productItem) {
        this.productItem = productItem;
    }

    public String getProductDescription() {
        return productDescription;
    }

    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }

    public String getProductDetails() {
        return productDetails;
    }

    public void setProductDetails(String productDetails) {
        this.productDetails = productDetails;
    }

    public Customer getCustomer() {
        return customer;
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
    }
//region 3. toString


    @Override
    public String toString() {
        return "Product{" +
                "productItem='" + productItem + '\'' +
                ", productDescription='" + productDescription + '\'' +
                ", productDetails='" + productDetails + '\'' +
                '}';
    }
}
