import React, { useState } from 'react';
import axios from 'axios';
import service from "../../api/service";
import {Link, useNavigate} from 'react-router-dom'


function AddFormRestaurant(props) {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [averagePrice, setAveragePrice] = useState(0);
    const [description, setDescription] = useState('');
    const [imageURL, setImageURL] = useState('');

    const navigate = useNavigate();




    const handleFileUpload = (e) => {
      // console.log("The file to be uploaded is: ", e.target.files[0]);
   
      const uploadData = new FormData();
   
      // imageUrl => this name has to be the same as in the model since we pass
      // req.body to .create() method when creating a new movie in '/api/movies' POST route
      uploadData.append("imageUrl", e.target.files[0]);
   
      service
        .uploadImage(uploadData)
        .then(response => {
          // console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state
          setImageURL(response.fileUrl);
        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };



    const handleSubmit = (e) => {
      e.preventDefault();

      const body = { name, averagePrice,location, description, imageURL };
  
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/restaurants`, body)
        .then((response) => {
          setName('');
          setAveragePrice('');
          setLocation('');
          setDescription('');
          setImageURL('');
          // props.refreshRestaurants();
          navigate('/restaurants')
          console.log('hey')
        })
        .catch((err) => console.log(err));
    };

  return (
    <div>
        <h3>Add a new restaurant</h3>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />

            <label htmlFor="averagePrice">Average Price</label>
            <input type="number" name='averagePrice' value={averagePrice} onChange={(e) => setAveragePrice(e.target.value)} />

            <label htmlFor="location">Location</label>
            <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} />

            <label htmlFor="description">Description</label>
            <textarea name='description' value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} />

            <label htmlFor="imageURL">Picture</label>
            <input type="file" name="imageURL" onChange={(e) => handleFileUpload(e)} />

            <button type="submit">Add Restaurant</button>
        </form>
    </div>
  )
}

export default AddFormRestaurant