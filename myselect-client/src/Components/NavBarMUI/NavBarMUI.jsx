import React, {useState} from 'react'
import { BottomNavigation } from '@mui/material'
import { BottomNavigationAction } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { Link } from 'react-router-dom';


function NavBarMUI() {
    const [value, setValue] = useState('');
    
  return (
    <div>
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

    </div>
  )
}

export default NavBarMUI