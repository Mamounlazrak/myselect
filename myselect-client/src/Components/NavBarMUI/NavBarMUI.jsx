import React, {useState} from 'react'
import { BottomNavigation } from '@mui/material'
import { BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';


function NavBarMUI() {
    const [value, setValue] = useState('');
    
  return (
    <Box sx={{pb : 7}}>
      <CssBaseline />
      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
        <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
            setValue(newValue);
        }}
        >
          <BottomNavigationAction component={Link} to="/" label="Home" icon={<HomeIcon />} />
          <BottomNavigationAction component={Link} to="/restaurants" label="Restaurants" icon={<RestaurantIcon />} />
          <BottomNavigationAction component={Link} to="/profile" label="Profile" icon={<AccountBoxIcon />} />
        </BottomNavigation>
      </Paper>
    </Box>
  )
}

export default NavBarMUI