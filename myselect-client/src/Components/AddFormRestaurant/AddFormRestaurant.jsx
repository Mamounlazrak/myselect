import React, { useState } from 'react';
import axios from 'axios';
import service from "../../api/service";
import {Link, useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useFormControl } from '@mui/material/FormControl';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';





function AddFormRestaurant(props) {

    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [latitude, setLatitude] = useState('');
    const [longitude, setLongitude] = useState('');
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
          console.log("response is: ", response);
          // response carries "fileUrl" which we can use to update the state
          setImageURL(response.fileUrl);
          console.log(imageURL);

        })
        .catch(err => console.log("Error while uploading the file: ", err));
    };



    const handleSubmit = (e) => {
      e.preventDefault();

      const body = { name, averagePrice, location, latitude, longitude, description, imageURL};
  
      axios
        .post(`${process.env.REACT_APP_API_URL}/api/restaurants`, body)
        .then((response) => {
          setName('');
          setAveragePrice('');
          setLocation('');
          setLatitude('');
          setLongitude('');
          setDescription('');
          setImageURL('');
          // props.refreshRestaurants();
          navigate('/restaurants')
          console.log('hey')
        })
        .catch((err) => console.log(err));
    };

  return (
    // <div>
    //     <h3>Add a new restaurant</h3>
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="name">Name</label>
    //         <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />

    //         <label htmlFor="averagePrice">Average Price</label>
    //         <input type="number" name='averagePrice' value={averagePrice} onChange={(e) => setAveragePrice(e.target.value)} />

    //         <label htmlFor="location">Location</label>
    //         <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} />

    //         <label htmlFor="description">Description</label>
    //         <textarea name='description' value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} />

    //         <label htmlFor="imageURL">Picture</label>
    //         <input type="file" name="imageURL" onChange={(e) => handleFileUpload(e)} />

    //         <button type="submit">Add Restaurant</button>
    //     </form>
    // </div>
     <Box sx = {{             
      display:'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      paddingLeft: 12,
      paddingRight: 12
      }}>
    
        <Box component="h3" sx = {{marginBottom: 1, marginTop: 0}}>
            Add a restaurant
        </Box>  
        <Box 
            component="form"
            onSubmit={handleSubmit}
            sx={{
                '& .MuiTextField-root': { maringTop: 2, marginBottom: 2, width: '35ch' }

            }}
            noValidate
            autoComplete="off">
            <div>
            <TextField
            label="Name"
            type="text"
            name='name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            />
            </div>
            <div>
            <TextField
            fullWidth={true}
            label="Average Price"
            type="number"
            name='averagePrice'
            value={averagePrice}
            onChange={(e) => setAveragePrice(e.target.value)}
            />
            </div>
            <div>
            <TextField
            label="Location"
            type="text"
            name='location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            />
            </div>
            <div>
            <TextField
            label="Latitude"
            type="text"
            name='latitude'
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            />  
            </div>
            <div>
            <TextField
            label="Longitude"
            type="text"
            name='longitide'
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            />
            </div>
            <div>
            <TextField
            label="Description"
            multiline={true}
            minRows="4"
            name='description'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            />
            </div>
            <div>
    
            {/* <label htmlFor="imageURL">Picture</label>
            <input type="file" name="imageURL" onChange={(e) => handleFileUpload(e)} /> */}
            <Box sx = {{
              display: 'flex', 
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '1ch',
              marginBottom: '1ch'
              // justifyContent: 'space-between',
              // width:'42ch'
          
            }}>
              <Box>
              <InputLabel>Add a picture</InputLabel>
              </Box>
              <Box>
              <Input
              disableUnderline={true}
              type="file"
              name='imageURL'
              onChange={(e) => handleFileUpload(e)}
              />
              </Box>
            </Box>

            
            
            </div>
          <Box sx = {{
            display: 'flex',
            justifyContent: 'flex-start',
            marginTop: '2vh',
            marginBottom: '4vh'
            
          }}>
            <Button variant='contained' type='submit'>Add Resataurant</Button>
          </Box>
        </Box>
        
    
    
    </Box> 

)
}

export default AddFormRestaurant
