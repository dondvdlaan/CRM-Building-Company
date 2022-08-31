import { ReactElement } from "react"
import ProjectForm from "./ProjectForm"


/**
 * Add new project
 */
export const AddProject = (): ReactElement =>{

return(
<ProjectForm
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
    currentPage="Add Project"
/>

)
}