import { ReactElement } from "react"
import ProjectForm from "./ProjectForm"


/**
 * Add new project
 */
export const AddProject = (): ReactElement =>{

return(
<ProjectForm
    projID=""
    projTitle=""
    projDesc=""
    projType=""
    projLand=""
    projSurface="0"
    projStart={new Date().toString()}
    projStatus=""
    projLostComment=""
    projNote=""
    projStreet=""   
    projHouseNumber=""
    projZipCode=""
    projCity=""
    projCountry=""
    custID=""
    custFirstName=""
    custLastName=""
    custTel=""
    custEmail=""
    isEdit={false}
    currentPage="Add Project"

/>

)
}