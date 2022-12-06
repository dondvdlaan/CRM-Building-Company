import { Link, SxProps, Theme, Typography } from "@mui/material";
import React from "react";

/**
 * Copyright displayed at bottum of Login screen
 * 
 * @ props margim top, margin bottum : margins for copyright
 */
function Copyright(props: any) 
// function Copyright(props:SxProps<Theme>) 

{
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://manyroads.dev/">
          Many Roads Developers
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }

  export default Copyright;