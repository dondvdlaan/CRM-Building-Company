import React, { useState } from 'react'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Copyright from './Copyright';
import { getTokenApi, simplifiedDBApi } from '../../shared/Api';
import { useNavigate } from 'react-router-dom';
import { Buffer } from 'buffer';

const theme = createTheme();

/**
 * Login Component for this application. User name and password are already stored
 * in DB
 */
export default function LogIn() {

  // *** Constants and variables ***
  const [errorMssg, setErrorMssg] = useState<String>("No error");
  const navigate = useNavigate();

  // *** Event handlers ***
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    const username = data.get('username');
    const password = data.get('password');
  
    
    console.log("username: ", username);
    console.log("password: ", password);

    const buf     = Buffer.from(`${username}:${password}`, 'utf8');
    // let basicAuth = `${username}:${password}`;
    let userpassword = buf.toString('base64');

    getTokenApi("POST", "user/token", userpassword )
    .then((res: any)=>{
      
      console.log("res: ", res.data)

      if(res.data){
        localStorage.setItem("userToken", res.data)
        navigate("/");
      } 
      else{
        localStorage.removeItem("userToken");
        setErrorMssg("Log in data erroneous")
      } 
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="User name"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Box display="flex" justifyContent="center">
                  {errorMssg}
                </Box>
              </Grid>
              {/* <Grid item>
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}