import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';


function RestaurantEditPage() {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');

    const {restaurantId} = useParams();

    const navigate = useNavigate();

    const fetchRestaurant = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            let {name, location, description, picture} = response.data
            setName(name)
            setLocation(location)
            setDescription(description)
            setPicture(picture)
        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchRestaurant()
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();

      const body = { name, location, description, picture };
  
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`, body)
        .then((response) => {
          setName('');
          setLocation('');
          setDescription('');
          setPicture('');
          navigate(`/restaurants/${restaurantId}`);
        })
        .catch((err) => console.log(err));
    };

  return (
    <div>
        <h3>Edit restaurant</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} />

            <label htmlFor="description">Description</label>
            <textarea name='description' value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="picture">Picture</label>
            <input type="text" name='picture' value={picture} onChange={(e) => setPicture(e.target.value)} />

            <button type="submit">Edit Restaurant</button>
        </form>
    </div>
  )
}

export default RestaurantEditPage