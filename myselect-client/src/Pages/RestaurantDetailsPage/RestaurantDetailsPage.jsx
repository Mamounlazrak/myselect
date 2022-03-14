import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/system';
import CssBaseline from '@mui/material/CssBaseline';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';








function RestaurantDetailsPage() {

 
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const { loggedIn, user, logoutUser, authenticateUser } = useContext(AuthContext);
    const [myRestaurants, setMyRestaurants] = useState(null);

    const navigate = useNavigate();


    const fetchMyRestaurants = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myrestaurants/no-populate/${user._id}`);
            setMyRestaurants(response.data);
        }
        catch (error) {
            console.log(error)
        }
    }
    const fetchRestaurant = async () => {
        try{
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            setRestaurant(response.data);
        } catch (error) {
            console.log(error);
        }
    };




    const addToMyList = () => {
        axios
            .put(`${process.env.REACT_APP_API_URL}/api/myrestaurants/${user._id}/${restaurantId}`)
            .then((newList) => {
                 fetchMyRestaurants()})
            .catch((err) => console.log(err));
    }


    const handleSubmitDelete = (e) => {
        e.preventDefault();

        axios
            .delete(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            .then((deleted) => {
                 navigate('/restaurants')})
            .catch((err) => console.log(err));
    }


    useEffect( () => {fetchRestaurant();
        fetchMyRestaurants()
    }, [user]);


  return (
    <Box sx={{
        display:'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        paddingLeft: 12,
        paddingRight: 12,
    }}>
        <CssBaseline />
        {restaurant && 
        <>
            <Box component="h3" sx={{margin: 0}}>{restaurant.name}</Box>
            <Box sx = {{margin: 0}}>Average Price: {restaurant.averagePrice}€</Box>
            <Box sx = {{margin: 0}}>Location: {restaurant.location}</Box>
            <CardMedia
                component="img"
                height="240"
                image={restaurant.imageURL}
                alt="restaurant image"

                sx = {{marginTop: 2, marginBottom: 2}}
            />
            <Box component="h4" sx={{margin: 0}}>About</Box>
            <Box component="p" sx={{margin: 0}}>{restaurant.description}</Box>



        {(loggedIn && !user.isAdmin) &&
            <>
            { (loggedIn && myRestaurants) && myRestaurants.includes(restaurantId) ? <Button variant="contained" onClick={() => addToMyList()} sx={{marginTop: 2, marginBottom: 2}}>Remove from my list</Button> : <Button variant="contained" onClick={() => addToMyList()} sx={{marginTop: 2, marginBottom: 2}}>Add to my list</Button> }
            </> 
        }



        {(loggedIn && user.isAdmin) &&
            <>
            <Link to={`/edit/${restaurantId}`}>Edit restaurant</Link>
            <form onSubmit={handleSubmitDelete}>
            <button type='submit'>Remove restaurant</button>
            </form>
            </>
        }

        {/* <Button variant="contained" onClick={() => addToMyList()}>Add to my list</Button> : <Button variant="contained" onClick={() => addToMyList()}>Remove from my list</Button> */}


            {/* <Box sx={{
                height:'25%',
                color: 'primary.main'

            }}>
                <Box component="img" src={restaurant.imageURL} alt="restaurant_image" sx={{ objectFit: 'cover' }}></Box>
            </Box> */}
        </>  
        
        }
    </Box>
  )
}

export default RestaurantDetailsPage