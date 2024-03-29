import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import AddFormRestaurant from '../../Components/AddFormRestaurant/AddFormRestaurant';
import service from "../../api/service";
import RestaurantCard from '../../Components/RestaurantCard/RestaurantCard';
import { Box } from '@mui/system';
import Tabss from '../../Components/Tabs/Tabss';
import Button from '@mui/material/Button';




function RestaurantsListPage() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [restaurants, setRestaurants] = useState([]);

    const fetchRestaurants = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants`)
            setRestaurants(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchRestaurants();

    }, []);
    

  return (
    
    <Box sx = {{
        paddingLeft: 12,
        paddingRight: 12
    }}>
          {/* <Tabss></Tabss> */}
        <Box sx = {{
          display: 'flex',
          justifyContent:'space-between',
          alignItems: 'center'

        }}>

          <Box component="h3" sx = {{textAlign: 'left', marginBottom: '0', marginTop: '0'}}>Restaurants</Box>
          {(loggedIn && user.isAdmin) && <Box>
            <Button size ="small" variant="outlined" component={Link} to="/addrestaurant">Add restaurant</Button>
          </Box>
          }

        </Box>
        {restaurants.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <RestaurantCard restaurant={restaurant}></RestaurantCard>

          </div>
        );
      })}



    </Box>
  )
}

export default RestaurantsListPage