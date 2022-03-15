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
        <Box component="h3" sx = {{marginBottom: 2, marginTop: 0}}>
            Personal Information
        </Box>
        <Box 
            component="form"
            sx={{
                '& .MuiTextField-root': { maringTop: 2, marginBottom: 2, width: '35ch' }

            }}
            noValidate
            autoComplete="off">
            <Box sx = {{marginLeft: 'O', paddingLeft: '0', textAlign:'left'}}>
            <TextField sx = {{marginLeft: 'O', paddingLeft: '0', textAlign:'left'}}
            label="Email"
            type="text"
            //   autoComplete="current-password"
            />
            </Box>
            <div>
            <TextField
            label="Password"
            type="password"
            //   autoComplete="current-password"
            />
            </div>
        </Box>
        <Box sx = {{marginTop:'2ch'}}>
            <Button variant='outlined' onClick={logoutUser}>Logout</Button>
        </Box>
        
      </Box>
    

  )
}

export default ProfilePage