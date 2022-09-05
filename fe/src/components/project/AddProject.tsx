import { ReactElement } from "react"
import ProjectForm from "./ProjectForm"


/**
 * Add new project
 */
export const AddProject = (): ReactElement =>{

return(
<ProjectForm
    projID=""
    projTitle="aaaaaa"
    projDesc=""
    projType=""
    projLand={false}
    projSurface={0}
    projStart=""
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