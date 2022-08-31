import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {useParams,Link} from "react-router-dom";
import { useDBApi } from "../../shared/DBApi";
import { Project } from "../../types/Project";
import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography  from "@mui/material/Typography";
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';


/**
 * MainComponent to display Project Details
 */
export const ProjectDetails = () =>{

// *********** Constants and variables ***********
const params = useParams();
const [project] = useDBApi<Project>("GET",`project/${params.id}`);

if(!project) return(<p>Lade..</p>);

console.log("project ", project)

// *********** Event Listeners ***********
const onDelete = () =>{
  alert("help");
}
    return(
<>
    {/* Navigation bar */}
    <ButtonAppBar currentPage="Project Details" />

    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        '& > :not(style)': {
          m: 1,
          width: '48%',
          height: 350
        },
      }}
    >
      
      <Paper elevation={5}  >
        <Typography variant="h4" align='center'>{project.projTitle}</Typography>
        <Typography variant="body1" ml={2} >Description: {project.projDesc}</Typography>
      
          <Button
            variant="outlined" 
            color="warning"
            onClick={onDelete}
          >Delete</Button>
          <Button variant="outlined">Edit</Button>
      </Paper>
   
      <Paper elevation={5}>
        <Typography variant="h6" mb={2} ml={2}>Customer</Typography>
        <Typography variant="body1" ml={2} >First name: {project.customer.custFirstName}</Typography>
        <Typography variant="body1" ml={2} >Last name: {project.customer.custLastName}</Typography>
      
      </Paper>
 

     </Box>
</>
    )
}