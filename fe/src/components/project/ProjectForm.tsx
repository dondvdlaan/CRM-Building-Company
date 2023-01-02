import {
  TextField,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  NativeSelect,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio} from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../../uiElements/ButtonAppBar"

import { simplifiedDBApi, useDBApi, useStorageApi } from '../../shared/Api';
import { Method } from "axios";
import { ProjectWCustomer } from '../../types/Project';
import { Customer } from '../../types/Customer';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import helper from "./Helper"
import LogIn from '../login/LogIn';

interface Props extends ProjectWCustomer{
  isEdit: boolean;
  currentPage: string;
}

/**
 * Form to create and edit a Project
 */
export default function ProjectForm(props:Props) {
  
  // **************** Constants and variables **************** 
  // Get user token to check log in
  const auth          = useStorageApi("userToken");
  // Retrieve customers from DB for pop-up menu window
  const [customers]   = useDBApi<Customer[]>("GET","allCustomers", auth)
  
  
  // Form Input fields
  const [projTitle, setProjTitle]         = useState(props.projTitle);
  const [projDesc, setProjDesc]           = useState(props.projDesc);
  const [projType, setProjType]           = useState(props.projType);
  const [projLand, setProjLand]           = useState(props.projLand);
  const [projSurface, setProjSurface]     = useState(props.projSurface);
  const [projStart, setProjStart]         = useState<Dayjs | null>(dayjs(props.projStart));
  const [projStatus, setProjStatus]       = useState(props.projStatus);
  const [projForecastOrderDate, setProjForecastOrderDate] = 
                              useState<Dayjs | null>(dayjs(props.projForecastOrderDate));
  const [projNote, setProjNote]           = useState(props.projNote);
  const [projStreet, setProjStreet]       = useState(props.projAddress.addressStreet);
  const [projHouseNumber, setProjHouseNumber] = useState(props.projAddress.addressHouseNumber);
  const [projZipCode, setProjZipCode]     = useState(props.projAddress.addressZipCode);
  const [projCity, setProjCity]           = useState(props.projAddress.addressCity);
  const [projCountry, setProjCountry]     = useState(props.projAddress.addressCountry);
  const [custID, setCustID]               = useState(props.customer.custID);
  
  // Error states
  const [errorTitle, setErrorTitle]         = useState<boolean>(false);
  const [errorDesc, setErrorDesc]           = useState<boolean>(false);
  const [errorCustomer, setErrorCustomer]   = useState<boolean>(false);
  const [errorRequired, setErrorRequired]   = useState<boolean>(false);
  
  // Project Closed Lost comments
  const [openProjLost, setOpenProjLost]       = useState<boolean>(true);
  const [projLostComment, setProjLostComment] = useState(props.projLostComment);
  
  
  const navigate = useNavigate();
  
  // Wait till customers arrived (after last hook)
  if(!customers) return(<p>Loading customers...</p>)
  
  // Check if user is logged in
  if(!auth) return <LogIn />;

  const custFirstName = props.customer.custFirstName;
  const custLastName  = props.customer.custLastName;
  
  // Error messages
  const errMessageTitle     = "Please fill in Title and Description";
  const errMessageCustomer  = "Please select a customer";
  const errMessageRequired  = "Your input is required";

//Compose project payload object
  const project= () =>
    ({
      projID: props.projID,
      projTitle,
      projDesc,
      projType,
      projLand,
      projSurface,
      projStart,
      projStatus,
      projForecastOrderDate,
      projLostComment,
      projNote,
      projAddress:{
        addressStreet       : projStreet,
        addressHouseNumber  : projHouseNumber,
        addressZipCode      : projZipCode,
        addressCity         : projCity,
        addressCountry      : projCountry,
      }
    })


// **************** Functions ****************
/**
 * Check form user inputs before dispatch
 */
const checkFormInputs = (): boolean =>{
 
   // Variable
   let formCustomer = false;
   let formTitle = false;
   let formStatus = false;
  
   // Check Customer
   if(custID === "" ) setErrorCustomer(true);
   else {
     setErrorCustomer(false);
     formCustomer = true;
   } 
  // Check if Title or Description are empty, if so error
  if(projTitle === "" || projDesc === "" ){
    setErrorTitle(true)
    setErrorDesc(true)
  }
  else{
    setErrorTitle(false);
    setErrorDesc(false);
    formTitle = true;
    
  }
  // Check Status
  if(projStatus === "" ) setErrorRequired(true);
  else {
    setErrorRequired(false);
    formStatus = true;
  }
  
return formTitle && formStatus;
}

// **************** Event handlers ****************
const onProjStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
  let status = e.target.value;
  setProjStatus(status)

  if (status === 'Closed Lost') setOpenProjLost(true);
  else {
    setOpenProjLost(false);
    setProjLostComment("");
  }
}

const onProjLostOpen = () => {
  // setOpenProjLost(true);
};

const onProjLostClose = () => {
  // setOpenProjLost(false);
};

const handleCustomer = (event: React.ChangeEvent<HTMLInputElement>) => {
  setCustID(event.target.value);
}; 

const onHandleProject = (e: React.FormEvent) => {

  if(checkFormInputs() ){
	
    /**
    * Prepare message and send to DB. Project is stored with customer ID, 1-to-many, 
    * customer can have many projects
    */
    const [method, path]: [Method, string] = props.isEdit?
    ["PUT", `customer/${custID}/project`]:
    ["POST", `customer/${custID}/project`];
  
     simplifiedDBApi(method, path, auth, project())
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
        <ButtonAppBar currentPage={props.currentPage}/>

      {/* project Form */}
      <Box
        component="form"
        border={1} borderColor="grey"
        sx={{
          '& .MuiTextField-root': { mt:1, ml: 2, width: '22ch' },
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
              required={true}
              label="Select customer"
              value={custID}
              onChange={handleCustomer}
              error={errorCustomer}
              helperText={errorCustomer ? errMessageCustomer : ""}
              sx={{
                ml: 2,
                width: '20ch',
                }}
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
      <Grid container spacing={0.5} columns={5}>
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
          <Grid item xs={1}>
            <FormControl fullWidth>
              <InputLabel variant="standard" sx={{
                ml: 2, mt: 1}} htmlFor="uncontrolled-native">
                Type of Blockhouse
              </InputLabel>
              <NativeSelect
                variant="outlined"
                defaultValue={projType}
                inputProps={{
                name: 'age',
                id: 'uncontrolled-native',
                }}
              sx={{ml: 2, p:2, width: '20ch'}}
              onChange={(e) => setProjType(e.target.value)}
              >
                {props.isEdit ? 
                <option >{projType}</option>
                :
                <option >{""}</option>
              }
                {helper.types.map((type: string)=>
                <option key={type} >{type}</option>
                  )}
              </NativeSelect>
            </FormControl>
          </Grid>
          
          <Grid item xs={1}>
            <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Building land available?</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue=""
              name="radio-buttons-group"
              value={projLand}
              onChange={(e) => setProjLand(e.target.value)}
            >
              <FormControlLabel value="yes" control={<Radio />} label="yes" />
              <FormControlLabel value="no" control={<Radio />} label="no" />
            </RadioGroup>
            </FormControl>
          </Grid>
          
          <Grid item xs={1}>
            <TextField
              value={projNote}
              onChange={(e) => setProjNote(e.target.value)}
              required={false}
              label="Note"
              />
          </Grid>
        </Grid>
      <Grid container spacing={1} columns={5}>
        <Grid item xs={1}>
          <TextField
            value={projSurface}
            onChange={(e) => setProjSurface(e.target.value)}
            required={false}
            label="Surface m2"
          />
        </Grid>
        <Grid item xs={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Order Date Forecast"
              inputFormat="DD/MM/YYYY"
              value={projForecastOrderDate}
              onChange={setProjForecastOrderDate}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={1}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Start project"
              inputFormat="DD/MM/YYYY"
              value={projStart}
              onChange={setProjStart}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={1}>
            <FormControl fullWidth>
              <InputLabel 
                variant="standard" 
                sx={{ml: 2, mt: 1}} 
                htmlFor="uncontrolled-native"
                required={true}
                error={errorRequired}
                // helperText={errorTitle ? errMessageTitle : ""}
                >
                Project Status
              </InputLabel>
              <NativeSelect
                variant="outlined"
                defaultValue={projStatus}
                inputProps={{id: 'uncontrolled-native',}}
                sx={{ml: 2, p:2, width: '20ch'}}
                onChange={(e) => onProjStatus(e)}
              >
                {props.isEdit ? 
                <option >{projStatus}</option>
                :
                <option >{""}</option>
              }
                {helper.status.map(status=>
                <option key={status} >{status}</option>
                  )}
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={1}>
            {(projStatus === "Closed Lost" )?
               
              <TextField
                value={projLostComment}
                onChange={(e) => setProjLostComment(e.target.value)}
                required={false}
                label="Project Lost Reason"
              />
              :
              <span></span>
            }

          </Grid>
      </Grid>
      <Grid container spacing={1} columns={5}>
        <Grid item xs={1}>
          <TextField
            value={projStreet}
            onChange={(e) => setProjStreet(e.target.value)}
            required={false}
            label="Street"
          />
        </Grid>
        <Grid item xs={1}>
          <TextField
            value={projHouseNumber}
            onChange={(e) => setProjHouseNumber(e.target.value)}
            required={false}
            label="House number"
           />
        </Grid>
        <Grid item xs={1}>
          <TextField
            value={projZipCode}
            onChange={(e) => setProjZipCode(e.target.value)}
            required={false}
            label="Zip code"
           />
         </Grid>
         <Grid item xs={1}>
           <TextField
             value={projCity}
             onChange={(e) => setProjCity(e.target.value)}
             required={false}
             label="City"
           />
         </Grid>
         <Grid item xs={1}>
           <TextField
             value={projCountry}
             onChange={(e) => setProjCountry(e.target.value)}
             required={false}
             label="Country"
           />
        </Grid>  
      </Grid>
        <Button 
        type="button" 
        variant="outlined" 
        onClick={onHandleProject}  
        sx={{ ml: 2, mt: 1, mb: 1}}
        >
        Finished
        </Button>
    </Box>
    </>
  )
}
