import {
  TextField,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import React, { SetStateAction, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import Autocomplete from '@mui/material/Autocomplete';

import {
  useTheme,
  ThemeProvider
} from '@mui/material/styles';
import { simplifiedDBApi, useDBApi } from '../../shared/DBApi';
import { Method } from "axios";
import { Project, ProjectWCustomer, RawProjectWCustomer } from '../../types/Project';
import { Customer } from '../../types/Customer';

interface Props extends ProjectWCustomer{
  isEdit: boolean;
  currentPage: string;
}

/**
 * Form to create and edit Project
 */
export default function ProjectForm(props:Props) {
  
  // **************** Constants and variables **************** 
  // Retrieve customers from DB
  const [customers] = useDBApi<Customer[]>("GET","allCustomers")
  // Input fields
  const [projTitle, setProjTitle] = useState(props.projTitle);
  const [projDesc, setProjDesc] = useState(props.projDesc);
  const [projType, setProjType] = useState(props.projType);
  const [projLand, setProjLand] = useState(props.projLand);
  const [projSurface, setProjSurface] = useState(props.projSurface);
  const [projStart, setProjStart] = useState(props.projStart);
  const [projNote, setProjNote] = useState(props.projNote);
  const [projStreet, setProjStreet] = useState(props.projStreet);
  const [projHouseNumber, setProjHouseNumber] = useState(props.projHouseNumber);
  const [projZipCode, setProjZipCode] = useState(props.projZipCode);
  const [projCity, setProjCity] = useState(props.projCity);
  const [projCountry, setProjCountry] = useState(props.projCountry);
  const [custFirstName, setCustFirstName] = useState(props.custFirstName);
  const [custLastName, setCustLastName] = useState(props.custLastName);
  const [custID, setCustID] = useState(props.custID);

  
  // Error states
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorDesc, setErrorDesc]   = useState(false);
  
 
  // Error messages
  const errMessageTitle    = "Please fill in Title and Description";

  const theme = useTheme();
  const navigate = useNavigate();
  let customerName: String = "";
  const options: string[] = [];

  
//Compose project payload object
  const project= () =>
    ({
      projID: props.projID,
      projTitle,
      projDesc,
      projType,
      projLand: 0,
      projSurface,
      projStart,
      projNote,
      projStreet,
      projHouseNumber,
      projZipCode,
      projCity,
      projCountry,
    })
  const product=()=>
    ({
      productItem: "Itempie2",
      productDescription: "Bescrijving2",
      productDetails: "kleinifheden2"
    })

// Wait till customers arrived
if(!customers) return(<p>Lade...</p>)

console.log("PFormCustID", custID)
console.log("Cust Name", custFirstName + custLastName)


// **************** Functions ****************
customers.map(customer=>options.push(customer.custFirstName))
console.log("options", options)

/**
 * Check form user inputs before dispatch
 */
const checkFormInputs = (): boolean =>{
  // Variable
  let formOK = false;
  
  // Check if Title or Description are empty, if so error
  if(projTitle === "" || projDesc === "" ){
    setErrorTitle(true)
    setErrorDesc(true)
  }
  else{
    setErrorTitle(false);
    setErrorDesc(false);
    formOK = true;
  }
  return formOK;
}

// **************** Event handlers ****************
const handleCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
  setCustID(event.target.value);
}; 

const onHandleProject = (e: React.FormEvent) => {

  if(checkFormInputs() ){

    //Prepare message and send to DB
    const [method, path]: [Method, string] = props.isEdit?
    ["PUT", `customer/${custID}/project`]:
    ["POST", `customer/${custID}/project`];
  
     simplifiedDBApi(method, path, project())
    // Callback
    .then(()=>navigate("/allProjects"))
    .catch((error: any) => {
        console.log(error.message)
      })
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <ThemeProvider theme={theme}>
        <ButtonAppBar currentPage={props.currentPage}/>
      </ThemeProvider>

      {/* project Form */}
      <Box
        component="form"
        border={1} borderColor="grey"
        sx={{
          '& .MuiTextField-root': { mt:2, m: 2, width: '4 0ch' },
        }}
        noValidate
        autoComplete="off"
      >
      <Grid container spacing={1} columns={5}>
        <Grid item xs={1}>
            <br />
            <TextField
              id="outlined-select-currency"
              select
              label="Select"
              value={custID}
              onChange={handleCustomer}
              helperText="Please select customer"
            >
                <MenuItem value="">
                  {props.isEdit ? custFirstName + " " + custLastName : ""}
                </MenuItem>
              {customers.map((customer) => (
                <MenuItem key={customer.custID} value={customer.custID}>
                  {customer.custFirstName + " " + customer.custLastName}
                </MenuItem>
              ))}
            </TextField>
            
          </Grid>  
        </Grid>
        <Grid container spacing={1} columns={5}>
          <Grid item xs={1}>
            <TextField
              value={projTitle}
              onChange={(e) => setProjTitle(e.target.value)}
              required={true}
              label="Project Title"
              error={errorTitle}
              helperText={errorTitle ? errMessageTitle : ""}
            // 
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={projDesc}
              onChange={(e) => setProjDesc(e.target.value)}
              required={true}
              label="Project Description"
              error={errorDesc}
              helperText={errorDesc ? errMessageTitle : ""}
            />
          </Grid>
        </Grid>
        {/* <Grid container spacing={1} columns={5}>
          <Grid item xs={1}>
            <TextField
              value={projTel}
              onChange={(e) => setprojTel(e.target.value)}
              required={false}
              label="Tel"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={projEmail}
              onChange={(e) => setprojEmail(e.target.value)}
              required={false}
              label="Email"
              error={!isEmailValid(projEmail)}
              helperText={!isEmailValid(projEmail)?errMessageEmail:""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0.3} columns={5}>
          <Grid item xs={1}>
            <TextField
              value={projStreet}
              onChange={(e) => setprojStreet(e.target.value)}
              required={false}
              label="Street"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={projHouseNumber}
              onChange={(e) => setprojHouseNumber(e.target.value)}
              required={false}
              label="House number"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={projZipCode}
              onChange={(e) => setprojZipCode(e.target.value)}
              required={false}
              label="Zip code"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={projCity}
              onChange={(e) => setprojCity(e.target.value)}
              required={false}
              label="City"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={projCountry}
              onChange={(e) => setprojCountry(e.target.value)}
              required={false}
              label="Country"
            />
          </Grid>
        </Grid> */}
        <Button type="button" variant="outlined" onClick={onHandleProject}  >Finished</Button>
      </Box>
    </>
  )
}