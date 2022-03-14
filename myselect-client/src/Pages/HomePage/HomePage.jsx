import React from 'react'
import { Box } from '@mui/system';
import RestaurantCard from '../../Components/RestaurantCard/RestaurantCard';



function HomePage() {

    const restaurantOfTheWeek = {
        name: 'Amazonas',
        averagePrice: 15,
        location: 'Cc dos Barbadinhos 136 Loja E, 1170-041 Lisboa',
        description: 'Super chilled place. Good food & music.',
        imageURL: 'https://res.cloudinary.com/tf-lab/image/upload/w_600,h_337,c_fill,g_auto:subject,q_auto,f_auto/restaurant/49ba9d0f-ca50-4618-910a-e02c8d5cad5d/f67e03d6-ed3c-4af1-b87e-ca3701cabdc2.jpg'
    }

  return (
    <Box sx = {{
        // display: 'flex', 
        // flexDirection: 'column', 
        // alignItems: 'flex-start',
        paddingLeft: 12,
        paddingRight: 12
    }}>
        <Box component = "h3" sx = {{textAlign: 'left'}}>Restaurant of the week</Box>
        <RestaurantCard restaurant={restaurantOfTheWeek}></RestaurantCard>


    </Box>
  )
}

export default HomePage
