import { ReactElement } from "react"
import { useParams } from "react-router-dom";
import { dbApi, useDBApi } from "../../shared/DBApi";
import { Customer, CustomerWORegDate } from "../../types/Customer";
import CustomerForm from "./CustomerForm"


/**
 * Edit customer
 */
export const EditCustomer = (): ReactElement =>{

// Constants and variables
const params = useParams<{ id: string }>();
const [customer] = useDBApi<Customer>("GET",`customer/${params.id}`)

if(customer === undefined || customer=== null) return(<p>Lade..</p>);

console.log("Customer",customer);

return(
<CustomerForm
    custID={customer.custID}
    custFirstName={customer.custFirstName}
    custLastName={customer.custLastName}
    custTel={customer.custTel}
    custEmail={customer.custEmail}
    custStreet={customer.custStreet}
    custHouseNumber={customer.custHouseNumber}
    custZipCode={customer.custZipCode}
    custCity={customer.custCity}
    custCountry={customer.custCountry}
    custRegistrationDate={customer.custRegistrationDate}
    isEdit={true}
    currentPage="Edit Customer"
/>

)
}