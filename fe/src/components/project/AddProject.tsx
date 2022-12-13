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
    projStatus=""
    projLostComment=""
    projNote=""
    projAddress={initAddress}
    projCustomer = {initCustomer}
    custID=""
    isEdit={false}
    currentPage="Add Project"

/>

)
}