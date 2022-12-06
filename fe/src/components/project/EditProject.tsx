import { ReactElement } from "react"
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm"
import { Project, RawProjectWCustomer } from '../../types/Project';
import { useDBApi } from "../../shared/Api";



/**
 * Edit new project
 */
export const EditProject = (): ReactElement =>{

// Constants and variabels
const params = useParams();
const [project] = useDBApi<RawProjectWCustomer>("GET",`project/${params.id}`)

// Wait till project arrives
if(!project) return(<p>Lade..</p>);
    
console.log("EditProject", project)

return(
<ProjectForm
    projID={project.projID}
    projTitle={project.projTitle}
    projDesc={project.projDesc}
    projType={project.projType}
    projLand={project.projLand}
    projSurface={project.projSurface}
    projStatus={project.projStatus}
    projLostComment={project.projLostComment}
    projStart={project.projStart}
    projNote={project.projNote}
    projStreet={project.projStreet}
    projHouseNumber={project.projHouseNumber}
    projZipCode={project.projZipCode}
    projCity={project.projCity}
    projCountry={project.projCountry}
    custID={project.customer.custID}
    custFirstName={project.customer.custFirstName}
    custLastName={project.customer.custLastName}
    custTel=""
    custEmail=""
    isEdit={true}
    currentPage="Edit Project"
/>

)
}