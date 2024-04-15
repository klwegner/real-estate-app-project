import { useState } from "react";
import axios from "axios";
import { Flex, Box, Text, Icon } from '@chakra-ui/react';
import { redirect } from 'next/navigation'



//seems to work without htis--  delete later
// import { AuthContext } from "../auth.context";

//made env file work later
// const API_URL = process.env.DATABASE_URI;

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
  const [message, setMessage] = useState(undefined);

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
    const requestBody = { name, description, address, propertyType, squareFootage, numBaths, numBeds, price, hasHOA, amenitiesIncluded, inFloodZone };
    console.log('here is the req: ', requestBody);
    // console.log('Here is the api endpoint: ', API_URL);

    axios
      .post(`${API_URL}/api/addProperty`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.property) {
            console.log(response.data);    
            redirect('/')
  
        }
        })
      .catch((err) => setMessage(err.response.data.message));
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">Add a Property</Text>
      <Box>
          <form onSubmit={handleSubmitProperty}>
     
              <Text marginTop="2"><label>Name</label></Text>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleName}
              />


<Text marginTop="2"><label>Description</label></Text>
              <textarea
                type="text"
                name="description"
                value={description}
                onChange={handleDescription}
                rows="4"
                cols="33"
              ></textarea>



              <Text marginTop="2"><label>Address</label></Text>
              <input
                type="text"
                name="address"
                value={address}
                onChange={handleAddress}
              />


            {/* change this to radio button */}
<Text marginTop="2"><label>Property Type -- CHANGE TO RADIO BUTTON</label></Text>
              <input
                type="text"
                name="propertyType"
                value={propertyType}
                onChange={handlePropertyType}
              />
<Flex>
<Text marginTop="2"><label>Square Footage</label></Text>
              <input
                type="number"
                name="squareFootage"
                value={squareFootage}
                onChange={handleSquareFootage}
              />

<Text marginTop="2"><label>Number of Baths</label></Text>
              <input
                type="number"
                name="numBaths"
                value={numBaths}
                onChange={handleNumBaths}
              />

<Text marginTop="2"><label>Number of Beds</label></Text>
              <input
                type="number"
                name="numBeds"
                value={numBeds}
                onChange={handleNumBeds}
              />
</Flex>

<Text marginTop="2"><label>Price</label></Text>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handlePrice}
              />
              

              <Text marginTop="2"><label>Has HOA? --CHANGE TO BOOLEAN RADIO BUTTONS</label></Text>
              <input
                type="text"
                name="hasHOA"
                value={hasHOA}
                onChange={handleHoa}
              />


<Text marginTop="2"><label>Amenities Included</label></Text>
              <input
                type="text"
                name="amenities"
                value={amenitiesIncluded}
                onChange={handleAmenities}
              />

              
<Text marginTop="2"><label>In Flood Zone? --CHANGE TO BOOLEAN RADIO BUTTONS</label></Text>
              <input
                type="text"
                name="floodZone"
                value={inFloodZone}
                onChange={handleInFloodZone}
              />


            
            {message && (
              <div>
                <p>{message}</p>
              </div>
            )}

            <div>
              <button type="submit">Submit</button>
            </div>
          </form>
      </Box>
    </Box>
  );
}

export default AddPropertyPage;
