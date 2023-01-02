import {
  TextField,
  Box,
  Grid,
  Button
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import {
  useTheme,
  ThemeProvider
} from '@mui/material/styles';
import { Customer, CustomerWORegDate } from '../../types/Customer';
import { simplifiedDBApi, useStorageApi } from '../../shared/Api';
import { Method } from "axios";
import LogIn from '../login/LogIn';

interface Props extends Customer{
  isEdit: boolean;
  currentPage: string;
}

/**
 * Form to create and edit Customer
 */
export default function CustomerForm(props:Props) {

  // **************** Constants and variables **************** 
  const auth = useStorageApi("userToken");

  // Input fields
  const [custFirstName, setCustFirstName] = useState(props.custFirstName);
  const [custLastName, setCustLastName] = useState(props.custLastName);
  const [custTel, setCustTel] = useState(props.custTel);
  const [custEmail, setCustEmail] = useState(props.custEmail);
  const [custStreet, setCustStreet] = useState(props.custAddress.addressStreet);
  const [custHouseNumber, setCustHouseNumber] = useState(props.custAddress.addressHouseNumber);
  const [custZipCode, setCustZipCode] = useState(props.custAddress.addressZipCode);
  const [custCity, setCustCity] = useState(props.custAddress.addressCity);
  const [custCountry, setCustCountry] = useState(props.custAddress.addressCountry);
  // Not used as input field, but to complete Customer object to be sent to DB
  const [custRegistrationDate, setCustRegistrationDate] = useState(props.custRegistrationDate);

  // Error states
  const [errorFirstName, setErrorFirstName] = useState(false);
  const [errorLastName, setErrorLastName]   = useState(false);

  // Error messages
  const errMessageName    = "Please fill in your name";
  const errMessageEmail   = "Incorrect email, format is a@bcd.efg";

  const theme = useTheme();
  const navigate = useNavigate();
  
  // Check if user is logged in
  if(!auth) return <LogIn />;
  
  //Minimum requirements for email input field
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; 
  
  //Compose customer payload object
  const customer = () =>
    ({
      custID: props.custID,
      custFirstName,
      custLastName,
      custTel,
      custEmail,
      custRegistrationDate,
      custAddress: {
        addressID: props.custAddress.addressID,
        addressStreet: custStreet,
        addressHouseNumber: custHouseNumber,
        addressZipCode: custZipCode,
        addressCity: custCity,
        addressCountry: custCountry
      }
    })

// **************** Functions ****************
/**
 * Function to check correct format of Email. When Email not avialable, empty string
 * , ^$, is also good.
 * 
 * @param email  : string  - Email to be checked
 * @returm       ; boolean - True if email is valid
 */
const isEmailValid = (email:string): boolean =>{

// Check if email according Regex or empty string
  return (( email.match(emailRegex) || email.match(/^$/)) === null)? false:true
} 

/**
 * Check form user inputs before dispatch. If inputs are incorrect, error message
 * is sent.
 * 
 * @returm ; boolean - True, when form inputs are correct
 */
const checkFormInputs = (): boolean =>{
  // Variable
  let formOK = false;
  
  // Check if First name or Last name are empty or email is not valid
  if(custFirstName === "" || custLastName === "" || !isEmailValid(custEmail)){
    setErrorFirstName(true)
    setErrorLastName(true)
  }
  else{
    setErrorFirstName(false);
    setErrorLastName(false);
    formOK = true;
  }
  return formOK;
}

// **************** Event handlers **************** 
  const onHandleCustomer = (e: React.FormEvent) => {

    if(checkFormInputs() ){

      //Prepare message and send to DB
      const [method, path]: [Method, string] = props.isEdit?
      ["PUT", `customer/${props.custID}`]:
      ["POST", "customer"];
  
      simplifiedDBApi(method, path, auth, customer())
      // Callback
      .then(()=>navigate("/allCustomers"))
      .catch((error: any) => {
          console.log(error.message)
        })
    }
  }

  return (
    <>
      {/* Navigation Bar */}
      <ButtonAppBar currentPage={props.currentPage}/>

      {/* Customer Form */}
      <Box
        component="form"
        border={1} borderColor="grey"
        sx={{
          '& .MuiTextField-root': { m: 2, width: '20ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <Grid container spacing={1} columns={5}>
          <Grid item xs={1}>
            <TextField
              value={custFirstName}
              onChange={(e) => setCustFirstName(e.target.value)}
              required={true}
              label="First name"
              error={errorFirstName}
              helperText={errorFirstName ? errMessageName : ""}
            // 
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={custLastName}
              onChange={(e) => setCustLastName(e.target.value)}
              required={true}
              label="Last name"
              error={errorLastName}
              helperText={errorLastName ? errMessageName : ""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={1} columns={5}>
          <Grid item xs={1}>
            <TextField
              value={custTel}
              onChange={(e) => setCustTel(e.target.value)}
              required={false}
              label="Tel"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={custEmail}
              onChange={(e) => setCustEmail(e.target.value)}
              required={false}
              label="Email"
              error={!isEmailValid(custEmail)}
              helperText={!isEmailValid(custEmail)?errMessageEmail:""}
            />
          </Grid>
        </Grid>
        <Grid container spacing={0.3} columns={5}>
          <Grid item xs={1}>
            <TextField
              value={custStreet}
              onChange={(e) => setCustStreet(e.target.value)}
              required={false}
              label="Street"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={custHouseNumber}
              onChange={(e) => setCustHouseNumber(e.target.value)}
              required={false}
              label="House number"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={custZipCode}
              onChange={(e) => setCustZipCode(e.target.value)}
              required={false}
              label="Zip code"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={custCity}
              onChange={(e) => setCustCity(e.target.value)}
              required={false}
              label="City"
            />
          </Grid>
          <Grid item xs={1}>
            <TextField
              value={custCountry}
              onChange={(e) => setCustCountry(e.target.value)}
              required={false}
              label="Country"
            />
          </Grid>
        </Grid>
        <Button 
        type="button" 
        variant="outlined" 
        onClick={onHandleCustomer}  
        sx={{ ml: 2, mt: 1, mb: 1}}
        >
        Finished
        </Button>
      </Box>
    </>
  )
}