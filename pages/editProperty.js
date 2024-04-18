"use client";
import Link from "next/link";
import { useState } from "react";
import axios from "axios";
import {
  Flex,
  Box,
  Text,
  Input,
  Textarea,
  Select,
  Button,
  Divider,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CldUploadButton } from "next-cloudinary";

const API_URL = 'http://localhost:5005';

function EditPropertyPage() {

    const router = useRouter();
    const { id, nm, ds, ad, pt, sf, baths, beds, pr, hoa, fl, am, img } = router.query;
    
  const [name, setName] = useState(nm);
  const [description, setDescription] = useState(ds);
  const [address, setAddress] = useState(ad);
  const [propertyType, setPropertyType] = useState(pt);
  const [squareFootage, setSquareFootage] = useState(sf);
  const [numBaths, setNumBaths] = useState(baths);
  const [numBeds, setNumBeds] = useState(beds);
  const [price, setPrice] = useState(pr);
  const [hasHOA, setHasHOA] = useState(hoa);
  const [amenitiesIncluded, setAmenitiesIncluded] = useState(am);
  const [inFloodZone, setInFloodZone] = useState(fl);
  const [imageUrl, setImageUrl] = useState(img);
  const [message, setMessage] = useState("");

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
    const requestBody = {
      name,
      description,
      address,
      propertyType,
      squareFootage,
      numBaths,
      numBeds,
      price,
      hasHOA,
      amenitiesIncluded,
      inFloodZone,
      imageUrl,
    };
    // console.log('here is the req: ', requestBody);

    axios.
    put(`${API_URL}/api/properties/${id}`, requestBody, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
        //   console.log(response.data);
          const { id } = router.query; 

          router.push(`/property/${id}`);
        }
      })
      .catch((err) => setMessage(err.toString()));
      // .catch((err) => console.error(err.toString()));

  };

  return (
    <Box>
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Add a Property
      </Text>

      <Box p="4">
        <form onSubmit={handleSubmitProperty}>
          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              The Basics
            </Text>
          </Flex>
          <Input
            placeholder={name}
            type="text"
            name="name"
            value={name}
            required
            onChange={handleName}
          />

          <Input
            placeholder={ad}
            type="text"
            name="address"
            value={address}
            required
            onChange={handleAddress}
          />

          <Textarea
            placeholder={ds}
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
            rows="4"
            cols="33"
          ></Textarea>

          <Select
            placeholder={pt}
            name="propertyType"
            value={propertyType}
            required
            onChange={handlePropertyType}
          >
            <option value="Rental">Rental</option>
            <option value="For Sale">For Sale</option>
          </Select>

          <Divider p="2" />

          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              The Visuals
            </Text>
          </Flex>
          <Flex justifyContent="center">
            <Button>
              <CldUploadButton
                uploadPreset="nextApp"
                onSuccess={(result) => {
                  setImageUrl(result.info.secure_url);
                }}
              >
                Upload an Image
              </CldUploadButton>
            </Button>
          </Flex>

          <Divider p="2" />

          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              The Numbers
            </Text>
          </Flex>

          <Input
            placeholder={pr}
            type="number"
            name="price"
            value={price}
            required
            onChange={handlePrice}
          />

          <Flex justifyContent="center">
            <Input
              placeholder={sf}
              type="number"
              name="squareFootage"
              value={squareFootage}
              required
              onChange={handleSquareFootage}
            />

            <Input
              placeholder={baths}
              type="number"
              name="numBaths"
              value={numBaths}
              required
              onChange={handleNumBaths}
            />

            <Input
              placeholder={beds}
              type="number"
              name="numBeds"
              value={numBeds}
              required
              onChange={handleNumBeds}
            />
          </Flex>

          <Divider p="2" />

          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              More Details
            </Text>
          </Flex>

          <Flex justifyContent="center">
            <Select
              placeholder={hoa}
              name="hasHOA"
              value={hasHOA}
              onChange={handleHoa}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </Select>

            <Select
              placeholder={fl}
              name="inFloodZone"
              value={inFloodZone}
              onChange={handleInFloodZone}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </Select>
          </Flex>

          <Input
            placeholder={am}
            type="text"
            name="amenities"
            value={amenitiesIncluded}
            onChange={handleAmenities}
          />

{message && (
            <Box backgroundColor="red">
            <Text textAlign="center">{message}. Are you <Link fontWeight="bold" href="/loginPage" passHref>
logged in?</Link>
</Text>

            </Box>
          )}

          <Flex justifyContent="center" p="4">
            <Button type="submit">Submit</Button>
          </Flex>
        </form>
      </Box>
    </Box>
  );
}

export default EditPropertyPage;
