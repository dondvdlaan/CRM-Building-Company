import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {useParams,useNavigate} from "react-router-dom";
import { simplifiedDBApi, useDBApi, useStorageApi } from "../../shared/Api";
import { ProjectWCustomer } from "../../types/Project";
import Paper from '@mui/material/Paper';
import Typography  from "@mui/material/Typography";
import Button from '@mui/material/Button';
import LogIn from "../login/LogIn";
import { Grid, Link } from "@mui/material";

/**
 * Component to display Project Details
 */
export const ProjectDetails = () =>{

// *********** Constants and variables ***********
const auth      = useStorageApi("userToken");
const params    = useParams();
const [project] = useDBApi<ProjectWCustomer>("GET",`project/${params.id}`);
const navigate  = useNavigate();

// Wait till project arrived
if(!project) return(<p>Loading Details..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;


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

   <Grid container spacing={2}>
    <Grid item xs={8}>
    
      {/* Project */}
      <Paper elevation={5} sx={{mt:1}}  >
        <Typography variant="h5" align='center'>{project.projTitle}</Typography>
        <Grid container spacing={0} sx={{mt:1}} >
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Description:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projDesc}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Type: </Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} > {project.projType}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Land available:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projLand}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Note:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projNote}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Netto surface m<sup>2</sup>:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projSurface}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Project start:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projStart.slice(0,10)}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Street:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projAddress.addressStreet}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >House number:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projAddress.addressHouseNumber}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Zip code:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projAddress.addressZipCode}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >City:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projAddress.addressCity}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body1" ml={2} >Country:</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography variant="body1" ml={2} >{project.projAddress.addressCountry}</Typography>
          </Grid>
        </Grid>
      
        <Typography align='center' sx={{mt:1}}>
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
    </Grid>

    <Grid item xs={4}>
        {/* Customer */}
      <Link href={`/editCustomer/${project.customer.custID}`}> 
        <Paper elevation={5} sx={{mt:1}} >
          <Typography variant="h6" mb={2} ml={2}>Customer</Typography>
          <Typography variant="body1" ml={2} >Name: {project.customer.custFirstName} {project.customer.custLastName}</Typography>
          <Typography variant="body1" ml={2} >Tel: {project.customer.custTel}</Typography>
          <Typography variant="body1" ml={2} >Email: {project.customer.custEmail}</Typography>
          <Typography variant="body1" ml={2} >Customer since: {project.customer.custRegistrationDate.slice(0,10)}</Typography>
        </Paper>
      </Link>   

        <Paper elevation={5} sx={{mt:2}}>
          <Typography variant="h6" mb={2} ml={2}>Project Status</Typography>
          <Typography variant="body1" ml={2} >Status: {project.projStatus}</Typography>
          <Typography variant="body1" ml={2} >Forecast Order Date: {project.projForecastOrderDate}</Typography>
        
        </Paper>
    </Grid>
  </Grid>
</>
    )
}