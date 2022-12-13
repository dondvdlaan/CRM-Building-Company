import { ReactElement } from "react"
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm"
import { Project, ProjectWCustomer } from '../../types/Project';
import { useDBApi } from "../../shared/Api";


/**
 * Edit project
 */
export const EditProject = (): ReactElement =>{

// Constants and variabels
const params = useParams();
const [project] = useDBApi<ProjectWCustomer>("GET",`project/${params.id}`)

// Wait till project arrives
if(!project) return(<p>Loading Project..</p>);

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
    projAddress = {project.projAddress}
    projCustomer = {project.projCustomer}
    custID={project.custID}
    isEdit={true}
    currentPage="Edit Project"
/>

)
}