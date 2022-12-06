import * as React from 'react';
import AppBar     from '@mui/material/AppBar';
import Box        from '@mui/material/Box';
import Toolbar    from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button     from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu       from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import BasicMenu from './BasicMenu';
import { useState } from 'react';

interface Props{
  currentPage: string
}

/**
 * Component for navigation top bar
 */
export default function ButtonAppBar(props:Props) {

  // *** Constants and variables ***

  // *** Eventhandlers ***
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>

          <BasicMenu />
          
          <Typography 
            variant   ="h6" 
            component ="div" 
            sx        ={{ flexGrow: 1 }}
            className = "title"
          >
            {props.currentPage}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
