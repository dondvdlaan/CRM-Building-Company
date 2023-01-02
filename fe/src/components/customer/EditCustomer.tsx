import { ReactElement } from "react"
import { useParams } from "react-router-dom";
import { dbApi, useDBApi, useStorageApi } from "../../shared/Api";
import { Customer, CustomerWORegDate } from "../../types/Customer";
import LogIn from "../login/LogIn";
import CustomerForm from "./CustomerForm"


/**
 * Edit customer
 */
export const EditCustomer = (): ReactElement =>{

// Constants and variables
const auth          = useStorageApi("userToken");
const params        = useParams<{ id: string }>();
const [customer]    = useDBApi<Customer>("GET",`customer/${params.id}`, auth)

// Wiaz till customer arruves
if(customer === undefined || customer=== null) return(<p>Lade..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;

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
    custAddress={customer.custAddress}
    isEdit={true}
    currentPage="Edit Customer"
/>

)
}