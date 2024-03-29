import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import service from "../../api/service";


function RestaurantEditPage() {

  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [averagePrice, setAveragePrice] = useState(0);
  const [description, setDescription] = useState('');
  const [imageURL, setImageURL] = useState('');

    const {restaurantId} = useParams();

    const navigate = useNavigate();

    const fetchRestaurant = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`)
            let {name, location, averagePrice, description, imageURL} = response.data
            setName(name)
            setLocation(location)
            setAveragePrice(averagePrice)
            setDescription(description)
            setImageURL(imageURL)
        } catch(error) {
            console.log(error)
        }
    }

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


    useEffect(() => {
        fetchRestaurant()
    }, []);

    const handleSubmit = (e) => {
      e.preventDefault();

      const body = { name, location, averagePrice, description, imageURL };
  
      axios
        .put(`${process.env.REACT_APP_API_URL}/api/restaurants/${restaurantId}`, body)
        .then((response) => {
          setName('');
          setLocation('');
          setAveragePrice(0);
          setDescription('');
          setImageURL('');
          navigate(`/restaurants/${restaurantId}`);
        })
        .catch((err) => console.log(err));
    };

  return (
    // <div>
    //     <h3>Edit restaurant</h3>
    //     <form onSubmit={handleSubmit}>
    //         <label htmlFor="name">Name</label>
    //         <input type="text" name='name' value={name} onChange={(e) => setName(e.target.value)} />

    //         <label htmlFor="location">Location</label>
    //         <input type="text" name='location' value={location} onChange={(e) => setLocation(e.target.value)} />

    //         <label htmlFor="description">Description</label>
    //         <textarea name='description' value={description} rows="4" cols="50" onChange={(e) => setDescription(e.target.value)} />

    //         <label htmlFor="imageURL">Picture</label>
    //         <input type="text" name='imageURL' value={imageURL} onChange={(e) => setImageURL(e.target.value)} />

    //         <button type="submit">Edit Restaurant</button>
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
            Edit restaurant information
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
              <InputLabel>Change the picture</InputLabel>
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
            <Button variant='contained' type='submit'>Confirm changes</Button>
          </Box>
        </Box>
        
    
    
    </Box> 

  )
}

export default RestaurantEditPage