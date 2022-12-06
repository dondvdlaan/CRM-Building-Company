import {
  TextField,
  Box,
  Grid,
  Button,
  FormControl,
  InputLabel,
  Select,
  NativeSelect,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@mui/material'
import MenuItem from '@mui/material/MenuItem';
import React, { SetStateAction, useState } from 'react'
import { useNavigate } from "react-router-dom";
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import Autocomplete from '@mui/material/Autocomplete';
import DialogActions from '@mui/material/DialogActions';

import {
  useTheme,
  ThemeProvider
} from '@mui/material/styles';
import { simplifiedDBApi, useDBApi } from '../../shared/Api';
import { Method } from "axios";
import { Project, ProjectWCustomer, RawProjectWCustomer } from '../../types/Project';
import { Customer } from '../../types/Customer';
import { DesktopDatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import helper from "./Helper"

interface Props extends ProjectWCustomer{
  isEdit: boolean;
  currentPage: string;
}

/**
 * Form to create and edit a Project
 */
export default function ProjectForm(props:Props) {
  
  // **************** Constants and variables **************** 
  // Retrieve customers from DB for pop-up window
  const [customers] = useDBApi<Customer[]>("GET","allCustomers")
  
  
  // Form Input fields
  const [projTitle, setProjTitle] = useState(props.projTitle);
  const [projDesc, setProjDesc] = useState(props.projDesc);
  const [projType, setProjType] = useState(props.projType);
  const [projLand, setProjLand] = useState(props.projLand);
  const [projSurface, setProjSurface] = useState(props.projSurface);
  const [projStart, setProjStart] = useState<Dayjs | null>(dayjs(props.projStart));
  const [projStatus, setProjStatus] = useState(props.projStatus);
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
  
  // Project Closed Lost comments
  const [openProjLost, setOpenProjLost]       = useState<boolean>(true);
  const [projLostComment, setProjLostComment] = useState(props.projLostComment);
  
  // Error messages
  const errMessageTitle    = "Please fill in Title and Description";
  
  const theme = useTheme();
  const navigate = useNavigate();
  
  // Wait till customers arrived (after last hook)
  if(!customers) return(<p>Loading customers...</p>)

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
      projLostComment,
      projNote,
      projStreet,
      projHouseNumber,
      projZipCode,
      projCity,
      projCountry,
    })


// **************** Functions ****************
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
const onProjStatus = (e: React.ChangeEvent<HTMLSelectElement>) => {
  let status = e.target.value;
  setProjStatus(e.target.value)

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
              label="Select"
              value={custID}
              onChange={handleCustomer}
              helperText="Please select customer"
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
              <InputLabel variant="standard" sx={{
                ml: 2, mt: 1}} htmlFor="uncontrolled-native">
                Project Status
              </InputLabel>
              <NativeSelect
                variant="outlined"
                defaultValue={projStatus}
                inputProps={{
                id: 'uncontrolled-native',
              }}
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
