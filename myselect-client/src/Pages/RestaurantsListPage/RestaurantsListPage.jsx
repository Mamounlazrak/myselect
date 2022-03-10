import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth.context';
import AddFormRestaurant from '../../Components/AddFormRestaurant/AddFormRestaurant';

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
    <div>
        <h3>Restaurants</h3>
        {(loggedIn && user.isAdmin) && <AddFormRestaurant refreshRestaurants = {fetchRestaurants} />}
        {console.log(user)}
        {console.log(restaurants)}
        {restaurants.map((restaurant) => {
        return (
          <div key={restaurant._id}>
            <Link to={`/restaurants/${restaurant._id}`}>
              <h3>{restaurant.name}</h3>
            </Link>
          </div>
        );
      })}



    </div>
  )
}

export default RestaurantsListPage