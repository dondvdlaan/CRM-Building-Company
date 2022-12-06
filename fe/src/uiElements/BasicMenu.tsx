import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';


/**
 * Component for basic menu
 */
export default function BasicMenu() {

  // ********* Constants and variables ********* 
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open                    = Boolean(anchorEl);
  let navigate                  = useNavigate();

  // ********* Eventhandlers ********* 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 
  
  return (
    <div>
      <IconButton
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={() => navigate("/allProjects")}>Projects</MenuItem>
        <MenuItem onClick={() => navigate("/addProject")}>Add Project</MenuItem>
        <MenuItem onClick={() => navigate("/allCustomers")}>Customers</MenuItem>
        <MenuItem onClick={() => navigate("/addCustomer")}>Add Customer</MenuItem>
        <MenuItem onClick={() => navigate("/allReferences")}>References</MenuItem>
      </Menu>
    </div>
  );
}
