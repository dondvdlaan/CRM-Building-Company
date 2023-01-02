import { ReactElement } from "react"
import { useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm"
import { Project, ProjectWCustomer } from '../../types/Project';
import { useDBApi, useStorageApi } from "../../shared/Api";
import LogIn from "../login/LogIn";


/**
 * Edit project
 */
export const EditProject = (): ReactElement =>{

// Constants and variabels
const auth      = useStorageApi("userToken");
const params    = useParams();
const [project] = useDBApi<ProjectWCustomer>("GET",`project/${params.id}`, auth)

// Wait till project arrives
if(!project) return(<p>Loading Project..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;

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
    projForecastOrderDate={project.projForecastOrderDate}
    projLostComment={project.projLostComment}
    projStart={project.projStart}
    projNote={project.projNote}
    projAddress = {project.projAddress}
    customer = {project.customer}
    isEdit={true}
    currentPage="Edit Project"
/>

)
}