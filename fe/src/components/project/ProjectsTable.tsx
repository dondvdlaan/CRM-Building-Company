import { DataGrid, GridColDef, GridEventListener } from '@mui/x-data-grid';
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import { useDBApi, useStorageApi } from '../../shared/Api';
import { ProjectWCustomer } from '../../types/Project';
import { useNavigate } from 'react-router-dom';
import LogIn from '../login/LogIn';
import './ProjectsTable.css';

// Definition table headers and fields
const columns: GridColDef[] = [
    { field: 'projID', headerName: 'ID', width: 70 },
    { field: 'projTitle', headerName: 'Project Title', width: 130 },
    { field: 'projDesc', headerName: 'Project Details', width: 130 },
    { field: 'projStatus', headerName: 'Project Status', width: 100 },
    { field: 'projForecastOrderDate', headerName: 'Order Date Forecast', width: 160 },
    { field: 'custFirstName', headerName: 'First Name', width: 130 },
    { field: 'custLastName', headerName: 'Last Name', width: 130 },
  ];

/**
 * Component to list all projects
 */
export const ProjectsTable = (props:{path: string}) =>{

// **************** Constants and variables ****************
const [projects ]       = useDBApi<ProjectWCustomer[]>('GET',props.path)
const navigate          = useNavigate();
const auth              = useStorageApi("userToken");
// 90 days is 3 months
const shortTerm: number = 90;

// Wait till projects arrived
if(!projects) return(<p>Loading Projects..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;

// *** Functions ***

/**
 * Determines if project purchase order date is within short term
 */
const shortTermProj = (projForecastOrderDate: string): string =>{
  
  // *** Constants and variables ***
  let term = "";
  const forecastDate = new Date(projForecastOrderDate);
  
  // Calculate the time difference between FC and current date
  let Difference_In_Time = forecastDate.getTime() - new Date().getTime();
      
  // If no. of days between two dates is less then shortTerm, color is shortTerm
  if((Difference_In_Time / (1000 * 3600 * 24)) < shortTerm) term = "shortTerm";

  return term;
};

// Convert projects for Datagrid table
let temp = {};
let projectsPrepared =[];

for(let project of projects){
        temp={
          projID                  : project.projID,
          projTitle               : project.projTitle,
          projDesc                : project.projDesc,
          projStatus              : project.projStatus,
          projForecastOrderDate   : project.projForecastOrderDate,
          custFirstName           : project.customer.custFirstName,
          custLastName            : project.customer.custLastName,
          status                  : shortTermProj(project.projForecastOrderDate)
        }
        projectsPrepared.push(temp)
    }

// **************** Event Handlers ****************
const onProject: GridEventListener<'rowClick'> = (params ) => {
  
  navigate(`/projectDetails/${params.id}`)

}

return(
<>

    {/* Navigation Bar */}
    {/* <ButtonAppBar currentPage="Projects" /> */}
    
    {/* Projects table */}
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(project) => project.projID}
        rows={projectsPrepared}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        getRowClassName={(params) => params.row.status }
        onRowClick={onProject} 
      />
    </div>
</>

)
}