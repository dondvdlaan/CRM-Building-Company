import ButtonAppBar from "../../../uiElements/ButtonAppBar"
import {simplifiedDBApi, useDBApi, useStorageApi } from "../../../shared/Api";
import { useTheme } from '@mui/material/styles';
import {Box, Button, Paper} from '@mui/material';
import Grid from '@mui/material/Grid';
import { Customer } from "../../../types/Customer";
import { useNavigate, useParams } from "react-router-dom";
import LogIn from "../../login/LogIn";
import {  ProjectsTable } from "../../project/ProjectsTable";
import EditIcon from '@mui/icons-material/Edit';
import { ContactDetailsCard } from "./ContactDetailsCard";

/**
 * Component to list details of a customer
 */
export const CustomerDetails = () =>{

// **************** Constants and variables ****************
const {custID}   = useParams<{custID: string | undefined}>()
const [customer] = useDBApi<Customer>('GET',`customer/${custID}`)
const theme      = useTheme();
const navigate   = useNavigate();
const auth       = useStorageApi("userToken");

// Wait till customers are there
if(!customer) return(<p>Loading customer..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;
 

// Error messages
const errMessageDelete  = "Can not delete customer,\n because a project still exists.";


// **************** Event handlers ****************
const onEdit = (e: React.FormEvent)=>{
  e.preventDefault();
  navigate(`/editCustomer/${custID}`);
}

const onDel = (e: React.FormEvent,row:Customer)=>{
  e.preventDefault();

  simplifiedDBApi("DELETE",`customer/${row.custID}`,{})
  // Callback to refresh page after API
  .then(() => window.location.reload()) 
  .catch((error: any) => {
    // handle error
    if (error.response.status === 500) alert(errMessageDelete);
  })
}

return(
<>
    {/* Navigation Bar */}
    <ButtonAppBar currentPage="Customer Details" />
    <Box sx={{ flexGrow: 1 }}>
     
      <Grid container spacing={2}>
        
        {/* Left side of page */}
        <Grid item xs={1}>
          <Paper elevation={5} sx={{mt:1}}>
            <Button 
              variant="text" 
              startIcon={<EditIcon />}
              onClick={(e)=>onEdit(e)}
            ></Button>
          </Paper>  
        </Grid>
        
        {/* Rightt side of page */}
        <Grid item xs={11}>
          <div style={{ height: "auto", width: '100%' }}>
            <Grid container xs={12}>
              
              {/* Left side */}
              <Grid item xs={6}>
                <ContactDetailsCard customer={customer} />
              </Grid>
              
              {/* Right side */}
              <Grid item xs={6}>
                <div>xs=6</div>
              </Grid>
            </Grid>
          </div>

          {/* Customer Projects */}
          <ProjectsTable path={`customer/${custID}/projects`} />
        </Grid>
      </Grid>
    </Box>
    
   
</>
)
}