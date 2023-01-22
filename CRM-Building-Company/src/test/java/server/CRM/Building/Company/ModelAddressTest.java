package server.CRM.Building.Company;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import server.CRM.Building.Company.model.Address;
import server.CRM.Building.Company.repository.AddressRepository;

import static org.junit.jupiter.api.Assertions.assertEquals;

@SpringBootTest
public class ModelAddressTest {

    @Autowired
    private AddressRepository addressRepository;

    /**
     * Save an Address and read back from test database H2
     */
    @Test
    @DisplayName("Save address and read back from DB")
    void SaveAddressAndCompare() {

        // Create address and save
        Address adresje = new Address("Hauptstrasse",
                                "167");

        addressRepository.save(adresje);
        Integer addressID = adresje.getAddressID();

        // When
        Address result = addressRepository.findById(addressID).get();

        // Then
        assertEquals(adresje.getAddressStreet(),result.getAddressStreet());
    }
}
