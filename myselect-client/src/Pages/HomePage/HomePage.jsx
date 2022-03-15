import React, { useState, useEffect, useContext } from 'react';
import { Box } from '@mui/system';
import RestaurantCard from '../../Components/RestaurantCard/RestaurantCard';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';





function HomePage() {

    const restaurantOfTheWeek = {
        name: 'Amazonas',
        averagePrice: 15,
        location: 'Cc dos Barbadinhos 136 Loja E, 1170-041 Lisboa',
        description: 'Super chilled place. Good food & music.',
        imageURL: 'https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/49ba9d0f-ca50-4618-910a-e02c8d5cad5d/f67e03d6-ed3c-4af1-b87e-ca3701cabdc2.jpg'
    }
    const { loggedIn, user, logoutUser } = useContext(AuthContext);


  return (
      <>
        <Box sx = {{
            display: 'flex', 
            flexDirection: 'column', 
            paddingLeft: 12,
            paddingRight: 12
        }}>
        {!loggedIn &&
                <Box sx = {{
                    display: 'flex', 
                    flexDirection: 'column',
                    height: '90vh', 
                    paddingTop: '4vh'
                }}>
                    <Box component = "h3" sx = {{}}>Find sustainable restaurants and brands in Lisbon</Box>
                    <Box>
                        <Button size ="small" variant="contained" component={Link} to="/signup">Get started</Button>
                    </Box>
                </Box>
        }
            <Box component = "h3" sx = {{textAlign: 'left'}}>Restaurant of the week</Box>
            <Box>
                <RestaurantCard restaurant={restaurantOfTheWeek}></RestaurantCard>
            </Box>
        </Box>
    </>
  )
}

export default HomePage
