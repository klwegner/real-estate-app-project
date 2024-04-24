"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
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
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { CldUploadButton } from "next-cloudinary";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function AddPropertyPage() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [squareFootage, setSquareFootage] = useState("");
  const [numBaths, setNumBaths] = useState("");
  const [numBeds, setNumBeds] = useState("");
  const [price, setPrice] = useState("");
  const [hasHOA, setHasHOA] = useState("");
  const [amenitiesIncluded, setAmenitiesIncluded] = useState("");
  const [inFloodZone, setInFloodZone] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState(undefined);
  const [loggedIn, setLoggedIn] = useState(false);
  const [submittingUser, setSubmittingUser] = useState("");
  const router = useRouter();
  const { isOpen, onToggle } = useDisclosure();

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

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    const user = localStorage.getItem("user");
    setLoggedIn(status);
    setSubmittingUser(user);
  }, []);

  const {
    isOpen: isVisible,
    onClose,
    onOpen,
  } = useDisclosure({ defaultIsOpen: true });

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
      submittingUser,
    };
    console.log("here is the req: ", requestBody);

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
          router.push("/");
        }
      })
      .catch((err) => {
        setMessage(err.toString());
        onToggle();
        onOpen();
      });
    // .catch((err) => console.error(err.toString()));
  };

  return (
    <>
      <>
        {!loggedIn && (
          <Box textAlign="center">
            <Heading marginTop="8">We got a problem here.</Heading>
            <Text
              marginTop="8"
              marginBottom="8"
              textAlign="center"
              fontSize="2xl"
            >
              You&apos;re not logged in!
            </Text>
            <Link href="/loginPage">Why don&apos;t you login now?</Link>
          </Box>
        )}
      </>

      {loggedIn && (
        <Box m="2">
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

              <Tooltip label="Name of Property" bg="gray.300" color="black">
                <Input
                  placeholder="Property Name"
                  type="text"
                  name="name"
                  value={name}
                  required
                  onChange={handleName}
                  marginBottom="4"
                />
              </Tooltip>

              <Tooltip label="Address" bg="gray.300" color="black">
                <Input
                  placeholder="Address"
                  type="text"
                  name="address"
                  value={address}
                  required
                  onChange={handleAddress}
                  marginBottom="4"
                />
              </Tooltip>

              <Tooltip label="Description" bg="gray.300" color="black">
                <Textarea
                  placeholder="Description"
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
                <Tooltip label="Type of Property" bg="gray.300" color="black">
                  <Select
                    placeholder="Property Type"
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
                    console.log(result);
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
                <Tooltip label="Price" bg="gray.300" color="black">
                  <Input
                    placeholder="Price"
                    type="number"
                    name="price"
                    value={price}
                    required
                    onChange={handlePrice}
                    w="auto"
                  />
                </Tooltip>

                <Spacer />

                <Tooltip label="Sq. Ft." bg="gray.300" color="black">
                  <Input
                    placeholder="Square Footage"
                    type="number"
                    name="squareFootage"
                    value={squareFootage}
                    required
                    onChange={handleSquareFootage}
                    w="auto"
                  />
                </Tooltip>

                <Spacer />
                <Tooltip label="Number of Baths" bg="gray.300" color="black">
                  <NumberInput min={1} max={10}>
                    <NumberInputField
                      placeholder="Baths"
                      // type="number"
                      name="numBaths"
                      value={numBaths}
                      required
                      onChange={handleNumBaths}
                    />
                    <NumberInputStepper>
                      <NumberIncrementStepper />
                      <NumberDecrementStepper />
                    </NumberInputStepper>
                  </NumberInput>
                </Tooltip>

                <Spacer />

                <Tooltip label="Number of Beds" bg="gray.300" color="black">
                  <NumberInput min={1} max={10}>
                    <NumberInputField
                      placeholder="Beds"
                      // type="number"
                      name="numBeds"
                      value={numBeds}
                      required
                      onChange={handleNumBeds}
                    />
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
                <Tooltip label="HOA" bg="gray.300" color="black">
                  <Select
                    placeholder="Has HOA?"
                    name="hasHOA"
                    value={hasHOA}
                    onChange={handleHoa}
                    w="auto"
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </Select>
                </Tooltip>

                <Tooltip label="Flood Zone" bg="gray.300" color="black">
                  <Select
                    placeholder="In Flood Zone?"
                    name="inFloodZone"
                    value={inFloodZone}
                    onChange={handleInFloodZone}
                    w="auto"
                  >
                    <option value="true">True</option>
                    <option value="false">False</option>
                  </Select>
                </Tooltip>
              </Flex>

              <Tooltip label="Amenities" bg="gray.300" color="black">
                <Input
                  placeholder="Amenities Included"
                  type="text"
                  name="amenities"
                  value={amenitiesIncluded}
                  onChange={handleAmenities}
                />
              </Tooltip>

              {/* 
<Input
            placeholder={submittingUser}
            type="text"
            name="submittingUser"
            value={submittingUser}
          /> */}

              {message && isVisible && (
                <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
                  <Alert
                    status="error"
                    variant="subtle"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    textAlign="center"
                    height="200px"
                  >
                    <AlertIcon boxSize="40px" mr={0} />
                    <AlertTitle mt={4} mb={1} fontSize="lg">
                      Error
                    </AlertTitle>
                    <AlertDescription maxWidth="sm">{message}</AlertDescription>
                    <CloseButton
                      alignSelf="flex-start"
                      position="relative"
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
      )}
    </>
  );
}

export default AddPropertyPage;
