import React, { useState } from 'react';
import axios from 'axios';


function AddFormRestaurant(props) {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [description, setDescription] = useState('');
    const [picture, setPicture] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();

      const body = { name, location, description, picture };
  
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/restaurants`, body)
        .then((response) => {
          setName('');
          setLocation('');
          setDescription('');
          setPicture('');
          props.refreshRestaurants();
        })
        .catch((err) => console.log(err));
    };

  return (
    <div>
        <h3>Add a new restaurant</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} />

            <label htmlFor="description">Description</label>
            <textarea name='description' value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="picture">Picture</label>
            <input type="text" name='picture' value={picture} onChange={(e) => setPicture(e.target.value)} />

            <button type="submit">Add Restaurant</button>
        </form>
    </div>
  )
}

export default AddFormRestaurant