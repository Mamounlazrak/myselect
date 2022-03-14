import React, { useContext } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { AuthContext } from '../../context/auth.context';



function ProfilePage() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);

  return (
    <Box sx = {{             
    display:'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 12,
    paddingRight: 12
    }}>
        <Box component="h3" sx = {{marginBottom: 1}}>
            Personal Information
        </Box>
        <Box 
            component="form"
            sx={{
                '& .MuiTextField-root': { m: 1, width: '25ch' },
   
            }}
            noValidate
            autoComplete="off">
            <div>
            <TextField
            label="Email"
            type="text"
            //   autoComplete="current-password"
            />
            </div>
            <div>
            <TextField
            label="Password"
            type="password"
            //   autoComplete="current-password"
            />
            </div>
        </Box>
        <Button onClick={logoutUser}>Logout</Button>
        
      </Box>
    

  )
}

export default ProfilePage