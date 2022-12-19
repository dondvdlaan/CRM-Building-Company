
import LogIn from "../login/LogIn";
import Chart from "./Chart"
import { useDBApi, useStorageApi } from "../../shared/Api"
import ButtonAppBar from "../../uiElements/ButtonAppBar";
import { Box, Container, Grid, Paper } from "@mui/material";
import { SalesData } from "../../types/Auxiliar";


/**
 * Component to display summary
 */
export const Summary = () =>{

    // *** Constants and variables ***
    const auth = useStorageApi("userToken");


    console.log("auth: ", auth);
    
    if(!auth) return <LogIn />;

    
    // simplifiedDBApi("GET","revenue")
    // .then((res: any) =>{
    //   console.log("resting res ", res.data);
    //   setSalesData(res.data);
    // })

    

return(
<>
    <ButtonAppBar currentPage="Summary" />
    
       {/* Right side of page */}
       <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto',
          }}
        >
          <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Grid container spacing={3}>
              
              {/* Chart */}
              <Grid item xs={12} md={6} lg={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    height: 240,
                  }}
                >
                  <Chart />
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </Box>
</>

    )

}