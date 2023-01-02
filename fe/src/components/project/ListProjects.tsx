import ButtonAppBar from "../../uiElements/ButtonAppBar"
import { useStorageApi } from '../../shared/Api';
import LogIn from '../login/LogIn';
import { ProjectsTable } from './ProjectsTable';


/**
 * Component to list all projects
 */
export const ListProjects = () =>{

// **************** Constants and variables ****************
const auth              = useStorageApi("userToken");

// Check if user is logged in
if(!auth) return <LogIn />;

// *** Functions ***

return(
<>
    {/* Navigation Bar */}
    <ButtonAppBar currentPage="Projects" />

    <ProjectsTable path={"allProjects"} auth={auth} />;
</>

)
}