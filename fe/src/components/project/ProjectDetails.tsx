import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {useParams} from "react-router-dom";
import { useDBApi } from "../../shared/DBApi";
import { Project } from "../../types/Project";


/**
 * Component to display Project Details
 */
export const ProjectDetails = () =>{

// Constants and variables
const params = useParams();
const [project] = useDBApi<Project>("GET",`project/${params.id}`);

if(!project) return(<p>Lade..</p>);

console.log("project ", project)

    return(
<>
{/* Navigation bar */}
<ButtonAppBar currentPage="Project Details" />



</>

    )
}