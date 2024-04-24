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
    Alert,
    AlertIcon,
    AlertTitle,
    AlertDescription,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Spacer,
    Slide,
    useDisclosure,
    Heading, 
    Tooltip,
    CloseButton,
    Image
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CldUploadButton } from "next-cloudinary";
import defaultImage from "../public/defaultImage.jpg";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

function EditPropertyPage() {

    const { isOpen, onToggle } = useDisclosure()
    const router = useRouter();
    const { id, nm, ds, ad, pt, sf, baths, beds, pr, hoa, fl, am, img } = router.query;
    
  const [name, setName] = useState(nm);
  const [description, setDescription] = useState(ds);
  const [address, setAddress] = useState(ad);
  const [propertyType, setPropertyType] = useState(pt);
  const [squareFootage, setSquareFootage] = useState(parseInt(sf));
  const [numBaths, setNumBaths] = useState(parseInt(baths));
  const [numBeds, setNumBeds] = useState(parseInt(beds));
  const [price, setPrice] = useState(parseInt(pr));
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
      .catch((err) => 
      {
        setMessage(err.toString())
        onToggle()

    });
      // .catch((err) => console.error(err.toString()));

  };

  return (
    <Box>
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Edit {name}
      </Text>

      <Box p="4">
        <form onSubmit={handleSubmitProperty}>
          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              The Basics
            </Text>
          </Flex>
<Flex justifyContent="center" m="4">
<Image
            src={imageUrl}
            fallbackSrc="https://www.renderhub.com/virtual3d/apartment-building-10/apartment-building-10-01.jpg"
            width="400"
            height="260"
            alt="property"
          />
</Flex>
         

          <Tooltip label='Name of Property' bg='gray.300' color='black'>

          <Input
            placeholder={name}
            type="text"
            name="name"
            value={name}
            required
            onChange={handleName}
            marginBottom="4"
          />
          </Tooltip>


          <Tooltip label='Address' bg='gray.300' color='black'>
          <Input
            placeholder={ad}
            type="text"
            name="address"
            value={address}
            required
            onChange={handleAddress}
            marginBottom="4"

          />
          </Tooltip>

          <Tooltip label='Description' bg='gray.300' color='black'>

          <Textarea
            placeholder={ds}
            type="text"
            name="description"
            value={description}
            onChange={handleDescription}
            rows="4"
            cols="33"
            marginBottom="4"

          ></Textarea>
          </Tooltip>

          <Flex justifyContent="center">

          <Tooltip label='Type of Property' bg='gray.300' color='black'>
          <Select
            placeholder={pt}
            name="propertyType"
            value={propertyType}
            required
            onChange={handlePropertyType}
            w="auto"

          >
            <option value="Rental">Rental</option>
            <option value="For Sale">For Sale</option>
          </Select>

          </Tooltip>

</Flex>

          <Divider p="2" />

          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              The Visuals
            </Text>
          </Flex>
          <Flex justifyContent="center">
            {/* <Button> */}
              <CldUploadButton
                uploadPreset="nextApp"
                onSuccess={(result) => {
                  setImageUrl(result.info.secure_url);
                }}
              >
                Upload an Image
              </CldUploadButton>
            {/* </Button> */}
          </Flex>

          <Divider p="2" />

          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              The Numbers
            </Text>
          </Flex>

          <Flex justifyContent="space-around">

          <Tooltip label='Price' bg='gray.300' color='black'>
          <Input
            placeholder={pr}
            type="number"
            name="price"
            value={price}
            required
            onChange={handlePrice}
            w="auto"

          />
          </Tooltip>

          <Spacer/>

          <Tooltip label='Sq. Ft.' bg='gray.300' color='black'>
            <Input
              placeholder={sf}
              type="number"
              name="squareFootage"
              value={squareFootage}
              required
              onChange={handleSquareFootage}
              w="auto"

            />
</Tooltip>

<Spacer/>

<Tooltip label='Number of Baths' bg='gray.300' color='black'>
<NumberInput min={1} max={10} defaultValue={numBaths}>
  <NumberInputField
                placeholder={baths}
              type="number"
              name="numBaths"
              value={numBaths}
              required
              onChange={handleNumBaths}/>
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
</Tooltip>

<Spacer/>


<Tooltip label='Number of Beds' bg='gray.300' color='black'>


<NumberInput min={1} max={10} defaultValue={numBeds}>
  <NumberInputField
                placeholder={beds}
              type="number"
              name="numBeds"
              value={numBeds}
              required
              onChange={handleNumBeds}/>
  <NumberInputStepper>
    <NumberIncrementStepper />
    <NumberDecrementStepper />
  </NumberInputStepper>
</NumberInput>
</Tooltip>
          </Flex>

          <Divider p="2" />

          <Flex justifyContent="center">
            <Text fontSize="x-large" fontWeight="bold">
              More Details
            </Text>
          </Flex>

          <Flex justifyContent="center" gap="10" marginBottom="4">
          <Tooltip label='HOA' bg='gray.300' color='black'>
            <Select
              placeholder={hoa}
              name="hasHOA"
              value={hasHOA}
              onChange={handleHoa}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </Select>
            </Tooltip>

            <Tooltip label='Flood Zone' bg='gray.300' color='black'>
            <Select
              placeholder={fl}
              name="inFloodZone"
              value={inFloodZone}
              onChange={handleInFloodZone}
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </Select>
            </Tooltip>

          </Flex>

          <Tooltip label='Amenities' bg='gray.300' color='black'>
          <Input
            placeholder={am}
            type="text"
            name="amenities"
            value={amenitiesIncluded}
            onChange={handleAmenities}
          />
          </Tooltip>


          {message && isVisible && (
  <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
  <Alert
  status='error'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='200px'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>Error</AlertTitle>
  <AlertDescription maxWidth='sm'>
    {message}
  </AlertDescription>
  <CloseButton
        alignSelf='flex-start'
        position='relative'
        right={-1}
        top={-1}
        onClick={onClose}
      />
</Alert>

</Slide>

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
