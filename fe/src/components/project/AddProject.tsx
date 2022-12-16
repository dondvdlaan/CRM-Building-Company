import { ReactElement } from "react"
import ProjectForm from "./ProjectForm"


/**
 * Add new project
 */
export const AddProject = (): ReactElement =>{

    // *** Constants and variables **
    const initAddress = {
        addressAddress:"",
        addressStreet:"",  
        addressHouseNumber:"",
        addressZipCode:"",
        addressCity:"",
        addressCountry:"", 
    }

    const initCustomer = {
        custID: "",
        custFirstName: "",
        custLastName: "",
        custTel: "",
        custEmail: "",
        custRegistrationDate: "",
    }

return(
<ProjectForm
    projID=""
    projTitle=""
    projDesc=""
    projType=""
    projLand=""
    projSurface=""
    projStart={new Date().toString()}
    projForecastOrderDate={new Date().toString()}
    projStatus=""
    projLostComment=""
    projNote=""
    projAddress={initAddress}
    customer = {initCustomer}
    isEdit={false}
    currentPage="Add Project"

/>

)
}