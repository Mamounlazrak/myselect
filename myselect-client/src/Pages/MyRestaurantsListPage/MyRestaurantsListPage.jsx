import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';


function MyRestaurantsListPage() {
    const { loggedIn, user, logoutUser } = useContext(AuthContext);
    const [myRestaurants, setMyRestaurants] = useState([]);

    const fetchMyRestaurants = async () => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/myrestaurants/${user._id}`)
            setMyRestaurants(response.data);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {
        fetchMyRestaurants();
    }, []);
    


  return (
    <div>
        <h3>My restaurants</h3>
        {myRestaurants.map((restaurant) => {
            return(
                <div key={restaurant._id}>
                    <h4>{restaurant.name}</h4>
                </div>
            )
        })}
    </div>
  )
}

export default MyRestaurantsListPage