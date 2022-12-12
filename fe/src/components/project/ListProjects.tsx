import { DataGrid, GridColDef, GridEventListener, GridValueGetterParams } from '@mui/x-data-grid';
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import { useDBApi, useStorageApi } from '../../shared/Api';
import { Project, RawProjectWCustomer } from '../../types/Project';
import { useNavigate } from 'react-router-dom';
import LogIn from '../login/LogIn';

// Definition table headers and fields
const columns: GridColDef[] = [
    { field: 'projID', headerName: 'ID', width: 70 },
    { field: 'projTitle', headerName: 'Project Title', width: 130 },
    { field: 'projDesc', headerName: 'Project Details', width: 130 },
    { field: 'projStatus', headerName: 'Project Status', width: 130 },
    { field: 'custFirstName', headerName: 'First Name', width: 130 },
    { field: 'custLastName', headerName: 'Last Name', width: 130 },
  ];

/**
 * omponent to list all projects
 */
export const ListProjects = () =>{

// **************** Constants and variables ****************
const [projects ]   = useDBApi<RawProjectWCustomer[]>('GET','allProjects')
const navigate      = useNavigate();
const auth          = useStorageApi("userToken");

// Wait till projects arrived
if(!projects) return(<p>Loading Projects..</p>);

// Check if user is logged in
if(!auth) return <LogIn />;

// Convert projects for Datagrid table
let temp = {};
let projectsPrepared =[];

for(let project of projects){
        temp={
          projID        : project.projID,
          projTitle     : project.projTitle,
          projDesc      : project.projDesc,
          projStatus    : project.projStatus,
          custFirstName : project.customer.custFirstName,
          custLastName  : project.customer.custLastName
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
    <ButtonAppBar currentPage="Projects" />

    {/* Projects table */}
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        getRowId={(project) => project.projID}
        rows={projectsPrepared}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        // checkboxSelection
        onRowClick={onProject} 
      />
    </div>
</>

)
}