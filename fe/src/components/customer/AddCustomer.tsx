import { ReactElement } from "react"
import CustomerForm from "./CustomerForm"


/**
 * Add new customer
 */
export const AddCustomer = (): ReactElement =>{

    // *** Constants and variables ***
    const initAddress = {
        addressID: "",
        addressStreet: "",
        addressHouseNumber: "",
        addressZipCode: "",
        addressCity: "",
        addressCountry:""}

return(
<CustomerForm
    custID=""
    custFirstName=""
    custLastName=""
    custTel=""
    custEmail=""
    custStreet=""
    custHouseNumber=""
    custZipCode=""
    custCity=""
    custCountry=""
    custRegistrationDate=""
    custAddress={initAddress}
    isEdit={false}
    currentPage="Add Customer"
/>

)
}