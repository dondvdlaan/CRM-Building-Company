import { ReactElement } from "react"
import CustomerForm from "./CustomerForm"


/**
 * Add new customer
 */
export const AddCustomer = (): ReactElement =>{

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
    isEdit={false}
    currentPage="Add Customer"
/>

)
}