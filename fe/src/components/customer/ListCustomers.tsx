import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {simplifiedDBApi, useDBApi, useStorageApi } from "../../shared/Api";
import { useTheme,
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
import { Customer } from "../../types/Customer";
import { useNavigate, Link } from "react-router-dom";
import LogIn from "../login/LogIn";

/**
 * Component to list all customers
 */
export const ListCustomers = () =>{

// **************** Constants and variables ****************
const auth           = useStorageApi("userToken");
const [customers ]   = useDBApi<Customer[]>('GET','allCustomers', auth)
const theme          = useTheme();
const navigate       = useNavigate();

// Wait till customers are there
if(!customers) return(<p>Loading customers..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;
 

// Error messages
const errMessageDelete  = "Can not delete customer,\n because a project still exists.";


// **************** Event handlers ****************
const onEdit = (e: React.FormEvent,row:Customer)=>{
  e.preventDefault();
  navigate(`/editCustomer/${row.custID}`);
}

const onDel = (e: React.FormEvent,row:Customer)=>{
  e.preventDefault();

  simplifiedDBApi("DELETE",`customer/${row.custID}`,auth ,{})
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
          {customers.map((customer:Customer) => (
            <TableRow
              component={Link}
              to={`/customerDetails/${customer.custID}`}
              key={customer.custID}
              // sx={{ '&:last-child td, &:last-child th': { border: 2 } }}
              sx={{'&:hover': { backgroundColor: 'grey' }}}
            > 
              <TableCell component="th" scope="row">
                <Typography variant="body2">{customer.custFirstName}</Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{customer.custLastName}</Typography>
              </TableCell>
              <TableCell align="left">
                <Grid>
                    <Typography variant="body2">E: {customer.custEmail}</Typography>
                    <Typography variant="body2">T: {customer.custTel} </Typography>
                </Grid>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2">{customer.custAddress.addressStreet} {customer.custAddress.addressHouseNumber}</Typography>
                <Typography variant="body2">{customer.custAddress.addressZipCode}</Typography>
                <Typography variant="body2">{customer.custAddress.addressCity}</Typography>
                <Typography variant="body2">{customer.custAddress.addressCountry}</Typography>
              </TableCell>
              <TableCell >
                <Typography variant="body2">
                  {customer.custRegistrationDate.slice(0,10)}
                </Typography>
              </TableCell>
              <TableCell align="center">
                <Typography variant="body2">
                  <Button 
                  variant="text" 
                  startIcon={<EditIcon />}
                  onClick={(e)=>onEdit(e,customer)}
                  ></Button>
                  
                  <Button 
                  variant="text" 
                  startIcon={<DeleteIcon />}
                  onClick={(e)=>onDel(e,customer)}
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