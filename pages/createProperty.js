'use client';

import { useState } from "react";
import axios from "axios";
import { Flex, Box, Text, Input, Textarea, Select, Button, Divider  } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { CldUploadButton   } from 'next-cloudinary';

const API_URL = 'http://localhost:5005';

function AddPropertyPage(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [squareFootage, setSquareFootage] = useState(null);
  const [numBaths, setNumBaths] = useState(null);
  const [numBeds, setNumBeds] = useState(null);
  const [price, setPrice] = useState(null);
  const [hasHOA, setHasHOA] = useState(null);
  const [amenitiesIncluded, setAmenitiesIncluded] = useState("");
  const [inFloodZone, setInFloodZone] = useState(null);
  const [imageUrl, setImageUrl] =  useState('');
  const [message, setMessage] = useState(undefined);
  const router = useRouter(); 


  const handleName = (e) => setName(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);
  const handleAddress = (e) => setAddress(e.target.value);
  const handlePropertyType = (e) => setPropertyType(e.target.value);
  const handleSquareFootage = (e) => setSquareFootage(e.target.value);
  const handleNumBaths = (e) => setNumBaths(e.target.value);
  const handleNumBeds = (e) => setNumBeds(e.target.value);
  const handlePrice = (e) => setPrice(e.target.value);
  const handleHoa = (e) => setHasHOA(e.target.value);
  const handleAmenities = (e) => setAmenitiesIncluded(e.target.value);
  const handleInFloodZone = (e) => setInFloodZone(e.target.value);

  const handleSubmitProperty = (event) => {
    event.preventDefault();
    const requestBody = { name, description, address, propertyType, squareFootage, numBaths, numBeds, price, hasHOA, amenitiesIncluded, inFloodZone,  imageUrl};
    // console.log('here is the req: ', requestBody);

    axios
      .post(`${API_URL}/api/addProperty`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
            // console.log(response.data);    
            // redirect('/')
            router.push('/');  
        }
        })
       .catch((err) => setMessage(err.response.data.message));

  };

  return (
    <Box>
      <Text fontSize="2xl" p="4" fontWeight="bold">Add a Property</Text>
      <Box p="4">
          <form onSubmit={handleSubmitProperty}>
     
  

<Flex justifyContent="center">
<Text fontSize="x-large" fontWeight="bold">The Basics</Text>

</Flex>
              <Input
              placeholder="Name"
                type="text"
                name="name"
                value={name}
                required
                onChange={handleName}
              />

                        <Input
              placeholder="Address"               
               type="text"
                name="address"
                value={address}
                required
                onChange={handleAddress}
              />

              <Textarea
              placeholder="Description"
                type="text"
                name="description"
                value={description}
                onChange={handleDescription}
                rows="4"
                cols="33"
              ></Textarea>

<Select placeholder="Property Type" name="propertyType" value={propertyType} required onChange={handlePropertyType}>
  <option value="Rental">Rental</option>
  <option value="For Sale">For Sale</option>
</Select>


<Divider p="2" />

<Flex justifyContent="center">
<Text fontSize="x-large" fontWeight="bold">The Visuals</Text>
</Flex>
        <Flex justifyContent="center">
<Button>
<CldUploadButton  uploadPreset="nextApp" onSuccess={(result) => {
    setImageUrl(result.info.secure_url); 
}}>  
        Upload an Image
</CldUploadButton>
</Button>

</Flex>

<Divider p="2" />

<Flex justifyContent="center">
<Text fontSize="x-large" fontWeight="bold">The Numbers</Text>

</Flex>

<Input
              placeholder="Price"
                type="number"
                name="price"
                value={price}
                required
                onChange={handlePrice}
              />

<Flex justifyContent="center">
              <Input
              placeholder="Square Footage"
                type="number"
                name="squareFootage"
                value={squareFootage}
                required
                onChange={handleSquareFootage}
              />




               <Input
              placeholder="Number of Baths"
                type="number"
                name="numBaths"
                value={numBaths}
                required
                onChange={handleNumBaths}
              />

              <Input
              placeholder="Number of Beds"
                type="number"
                name="numBeds"
                value={numBeds}
                required
                onChange={handleNumBeds}
              />
</Flex>

<Divider p="2" />

<Flex justifyContent="center">
<Text fontSize="x-large" fontWeight="bold">More Details</Text>

</Flex>

<Flex justifyContent="center">
<Select 
placeholder='Has HOA?'
name="hasHOA" value={hasHOA} onChange={handleHoa}>
  <option value="true">True</option>
  <option value="false">False</option>
</Select>
              
<Select
placeholder="In Flood Zone?" name="inFloodZone" value={inFloodZone} onChange={handleInFloodZone}>
  <option value="true">True</option>
  <option value="false">False</option>
</Select>
</Flex>


<Input
              placeholder="Amenities Included"
                type="text"
                name="amenities"
                value={amenitiesIncluded}
                onChange={handleAmenities}
              />






            
            {message && (
              <div>
                <p>{message}</p>
              </div>
            )}

            <Flex justifyContent="center" p="4">
              <Button type="submit">Submit</Button>
            </Flex>
          </form>
      </Box>
    </Box>
  );
}

export default AddPropertyPage;
