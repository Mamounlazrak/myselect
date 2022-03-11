import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, Navigate, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import { useNavigate } from 'react-router-dom';



function RestaurantDetailsPage() {
 
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const { loggedIn, user, logoutUser, authenticateUser } = useContext(AuthContext);
    const [myRestaurants, setMyRestaurants] = useState(null);

    const navigate = useNavigate();


    const fetchMyRestaurants = async () => {
        try {
            console.log('HEYYYYY', user)
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




    const handleSubmitList = (e) => {
        e.preventDefault();

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
    <div>
        {restaurant && <h3>{restaurant.name}</h3>}



        {(loggedIn && !user.isAdmin) &&
            <>
            <form onSubmit={handleSubmitList}>
            { (loggedIn && myRestaurants) && myRestaurants.includes(restaurantId) ? <button type='submit'>Remove from my list</button> : <button type='submit'>Add to my list</button> }
            </form>
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

       
    </div>
  )
}

export default RestaurantDetailsPage