import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {useParams,useNavigate} from "react-router-dom";
import { simplifiedDBApi, useDBApi, useStorageApi } from "../../shared/Api";
import { RawProjectWCustomer } from "../../types/Project";
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography  from "@mui/material/Typography";
import Button from '@mui/material/Button';
import LogIn from "../login/LogIn";


/**
 * Main Component to display Project Details
 */
export const ProjectDetails = () =>{

// *********** Constants and variables ***********
const params    = useParams();
const [project] = useDBApi<RawProjectWCustomer>("GET",`project/${params.id}`);
const navigate  = useNavigate();

// Check if user is logged in
const auth = useStorageApi("userToken");
  
if(!auth) return <LogIn />;

// Wait till project arrived
if(!project) return(<p>Loading Details..</p>);

// *********** Event Listeners ***********
const onDelete = () =>{

simplifiedDBApi("DELETE",`project/${params.id}`)
.then((res: any) =>console.log("res", res))
.then(()=>navigate("/allProjects"))
}

return(
<>
    {/* Navigation bar */}
    <ButtonAppBar currentPage="Project Details" />

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap'
        }}
    >
      {/* Project */}
      <Paper elevation={5} sx={{width: '60%'}} >
        <Typography variant="h4" align='center'>{project.projTitle}</Typography>
        <Typography variant="body1" ml={2} >Description: {project.projDesc}</Typography>
        <Typography variant="body1" ml={2} >Type: {project.projType}</Typography>
        <Typography variant="body1" ml={2} >Land available: {project.projLand}</Typography>
        <Typography variant="body1" ml={2} >Note: {project.projNote}</Typography>
        <Typography variant="body1" ml={2} >Netto surface m^2: {project.projSurface}</Typography>
        <Typography variant="body1" ml={2} >Project start: {project.projStart.slice(0,10)}</Typography>
        <Typography variant="body1" ml={2} >Street: {project.projStreet}</Typography>
        <Typography variant="body1" ml={2} >House number: {project.projHouseNumber}</Typography>
        <Typography variant="body1" ml={2} >Zip code: {project.projZipCode}</Typography>
        <Typography variant="body1" ml={2} >City: {project.projCity}</Typography>
        <Typography variant="body1" ml={2} >Country: {project.projCountry}</Typography>
      
        <Typography align='center'>
          <Button
            variant="outlined" 
            color="warning"
            onClick={onDelete}
          >Delete</Button>
          
          <Button 
            variant="outlined"
            onClick={()=>navigate(`/editProject/${params.id}`)}
          >Edit</Button>
        </Typography>
      </Paper>
   
      {/* Customer */}
      <Paper elevation={5} sx={{width: '40%'}}>
        <Typography variant="h6" mb={2} ml={2}>Customer</Typography>
        <Typography variant="body1" ml={2} >Name: {project.customer.custFirstName} {project.customer.custLastName}</Typography>
        <Typography variant="body1" ml={2} >Tel: {project.customer.custTel}</Typography>
        <Typography variant="body1" ml={2} >Email: {project.customer.custEmail}</Typography>
        <Typography variant="body1" ml={2} >Customer since: {project.customer.custRegistrationDate.slice(0,10)}</Typography>
      
      </Paper>
    </Box>
</>
    )
}