import * as React from 'react';
import { DataGrid, GridColDef, GridEventListener, GridValueGetterParams } from '@mui/x-data-grid';
import ButtonAppBar from "../../uiElements/ButtonAppBar"
import { useDBApi } from '../../shared/DBApi';
import { Project, RawProjectWCustomer } from '../../types/Project';
import { useNavigate } from 'react-router-dom';

// Definition table headers and fields
const columns: GridColDef[] = [
    { field: 'projID', headerName: 'ID', width: 70 },
    { field: 'projTitle', headerName: 'Project Title', width: 130 },
    { field: 'projDesc', headerName: 'Project Details', width: 130 },
    { field: 'custFirstName', headerName: 'First Name', width: 130 },
    { field: 'custLastName', headerName: 'Last Name', width: 130 },
  ];

/**
 * Main Component to list all projects
 */
export const ListProjects = () =>{

// **************** Constants and variables ****************
const [projects ]   = useDBApi<RawProjectWCustomer[]>('GET','allProjects')
const navigate      = useNavigate();

// Wait till projects arrived
if(!projects) return(<p>Lade..</p>);

// Convert projects for Datagrid table
let temp = {};
let projectsPrepared =[];

for(let project of projects){
        temp={
          projID        : project.projID,
          projTitle     : project.projTitle,
          projDesc      : project.projDesc,
          custFirstName : project.customer.custFirstName,
          custLastName  : project.customer.custLastName
        }
        projectsPrepared.push(temp)
    }

// **************** Event Handlers ****************
const onProject: GridEventListener<'rowClick'> = (params ) => {
  
  console.log("Howdo?", params.id)
  navigate(`/projectDetails/${params.id}`)

}

return(
<>
    <ButtonAppBar currentPage="Projects" />

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