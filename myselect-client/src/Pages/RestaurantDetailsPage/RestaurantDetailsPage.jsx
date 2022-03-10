import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';


function RestaurantDetailsPage() {
 
    const { restaurantId } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [myRestaurants, setMyRestaurants] = useState(null);


    const fetchRestaurant = async () => {
        try{
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            setRestaurant(response.data);
            // refreshMyRestaurants
            // setMyRestaurants(user.restaurantsList);
        } catch (error) {
            console.log(error);
        }
    };

    // const fetchMyRestaurants = () => {}

    const handleSubmit = (e) => {
        e.preventDefault();

        axios
            .put(`${process.env.REACT_APP_API_URL}/api/myrestaurants/${user._id}/${restaurantId}`)
            .then((newList) => {
                setMyRestaurants(newList.data)
                user.restaurantsList = newList.data})
            // .then((newList) => console.log(newList))
            // console.log(myRestaurants)
            .catch((err) => console.log(err));
    }
    useEffect( () => {fetchRestaurant();
    }, []);

  return (
    <div>
        {/* {console.log('HEYYY', myRestaurants)} */}
        {restaurant && <h3>{restaurant.name}</h3>}
        <form onSubmit={handleSubmit}>
            {/* { loggedIn && user.restaurantsList.includes(restaurantId) ? <button type='submit'>Remove from my list</button> : <button type='submit'>Add to my list</button> } */}
            { myRestaurants && myRestaurants.includes(restaurantId) ? <button type='submit'>Remove from my list</button> : <button type='submit'>Add to my list</button> }
        </form>
    </div>
  )
}

export default RestaurantDetailsPage