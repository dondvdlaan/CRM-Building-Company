package server.CRM.Building.Company.model;

import javax.persistence.*;

@Entity // This tells Hibernate to make a table out of this class
public class Product {
    // region 0 Constants
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO) // Auto increment id
    private Integer prodID;
    private String productItem;
    private String productDescription;
    private String productDetails;

    // region 1 Constructor
    public Product(){ }

    public Product(Integer productID, String productItem, String productDescription, String productDetails) {
        this.prodID = productID;
        this.productItem = productItem;
        this.productDescription = productDescription;
        this.productDetails = productDetails;
    }
    // region 2 Getters and Setters

    public Integer getProdID() {
        return prodID;
    }
    public String getProductItem() {
        return productItem;
    }
    public String getProductDescription() {
        return productDescription;
    }
    public String getProductDetails() {
        return productDetails;
    }

    public void setProdID(Integer prodID) {
        this.prodID = prodID;
    }
    public void setProductItem(String productItem) {
        this.productItem = productItem;
    }
    public void setProductDescription(String productDescription) {
        this.productDescription = productDescription;
    }
    public void setProductDetails(String productDetails) {
        this.productDetails = productDetails;
    }

    //region 3. toString
    @Override
    public String toString() {
        return "Product{" +
                "intProductID='" + prodID + '\'' +
                ", strProductItem='" + productItem + '\'' +
                ", strProductDescription='" + productDescription + '\'' +
                ", strProductDetails='" + productDetails + '\'' +
                '}';
    }

}
