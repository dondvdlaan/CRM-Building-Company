import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {dbApi, simplifiedDBApi, useDBApi } from "../../shared/Api";
import { useTheme,  
        createTheme, 
        ThemeProvider,
                             } from '@mui/material/styles';
import {Table, 
        
        TableBody,
        TableCell,
        TableContainer,
        TableHead,
        TableRow
      } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import { Customer, CustomerWORegDate } from "../../types/Customer";
import { useNavigate } from "react-router-dom";

/**
 * Component to list all customers
 */
export const ListCustomers = () =>{

// **************** Constants and variables ****************
const [rows ]   = useDBApi<Customer[]>('GET','allCustomers')
const theme     = useTheme();
const navigate  = useNavigate();

// Wait till rows are there
if(!rows) return(<p>Lade..</p>);

// Error messages
const errMessageDelete  = "Can not delete customer,\n because a project still exists.";


// **************** Event handlers ****************
const onEdit = (e: React.FormEvent,row:Customer)=>{
  e.preventDefault();
  navigate(`/editCustomer/${row.custID}`);
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
    <ButtonAppBar currentPage="Customers" />

    {/* Table of Customers */}
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>First name</TableCell>
            <TableCell align="left">Last name</TableCell>
            <TableCell align="left">Contact</TableCell>
            <TableCell align="left">Address</TableCell>
            <TableCell align="left">Reg. Date</TableCell>
            <TableCell align="center">Edit - Del</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row:Customer) => (
            <TableRow
              key={row.custID}
              // sx={{ '&:last-child td, &:last-child th': { border: 2 } }}
              sx={{'&:hover': { backgroundColor: 'grey' }}}
            > 
              <TableCell component="th" scope="row">
                  <Typography variant="body2">{row.custFirstName}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{row.custLastName}</Typography>
              </TableCell>
              <TableCell align="left">
                <Grid>
                    <Typography variant="body2">E: {row.custEmail}</Typography>
                    <Typography variant="body2">T: {row.custTel} </Typography>
                </Grid>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{row.custStreet} {row.custHouseNumber}</Typography>
                <Typography variant="body2">{row.custZipCode}</Typography>
                <Typography variant="body2">{row.custCity}</Typography>
                <Typography variant="body2">{row.custCountry}</Typography>
              </TableCell>
              <TableCell >
                <Typography variant="body2">
                  {row.custRegistrationDate.slice(0,10)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">
                  <Button 
                  variant="text" 
                  startIcon={<EditIcon />}
                  onClick={(e)=>onEdit(e,row)}
                  ></Button>
                  
                  <Button 
                  variant="text" 
                  startIcon={<DeleteIcon />}
                  onClick={(e)=>onDel(e,row)}
                  ></Button>
                </Typography>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
</>
)
}