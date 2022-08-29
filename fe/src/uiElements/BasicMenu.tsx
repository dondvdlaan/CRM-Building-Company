import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';



/**
 * Component for basic menu
 */
export default function BasicMenu() {

  // ********* Constants and variables ********* 
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open                    = Boolean(anchorEl);
  let navigate                  = useNavigate();

  // ********* Eventhandlers ********* 
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  }; 
  
  const onProjects = () => {
    navigate("/allProjects");
  };
  const onCustomers = () => {
    navigate("/allCustomers");
  };
  const onAddCustomer = () => {
    navigate("/addCustomer");
  };
  const onReferences = () => {
    navigate("/allReferences");
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
        <MenuItem onClick={onProjects}>Projects</MenuItem>
        <MenuItem onClick={onCustomers}>Customers</MenuItem>
        <MenuItem onClick={onAddCustomer}>Add Customer</MenuItem>
        <MenuItem onClick={onReferences}>References</MenuItem>
      </Menu>
    </div>
  );
}
