import Link from "next/link";
import {
  Image,
  Flex,
  Box,
  Text,
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Spacer,
  Heading,
  SimpleGrid,
  Divider,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useColorMode } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";

const Home = () => {
  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const [propertiesForRent, setPropertiesForRent] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    const fetchRentalProperties = async () => {
      const API_URL = "http://localhost:5005";
      try {
        const response = await axios.get(`${API_URL}/api/properties/rentals`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.status === 200 && response.data) {
          const properties = response.data;
          setPropertiesForRent(properties);
          // console.log(propertiesForRent);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchForSaleProperties = async () => {
      const API_URL = "http://localhost:5005";
      try {
        const response = await axios.get(`${API_URL}/api/properties/forSale`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        });
        if (response.status === 200 && response.data) {
          const properties = response.data;
          setPropertiesForSale(properties);
          // console.log(propertiesForSale);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRentalProperties();
    fetchForSaleProperties();
  }, []);

  return (
    <Box backgroundColor="transparent">
      <Banner
        purpose="RENT A HOME"
        title1="Rental Properties With"
        title2="A Luxurious Feel"
        desc1="Explore Rentals in Tampa Bay"
        buttonText="Rental Properties"
        linkName="/search?purpose=for-rent"
        imageUrl="https://s3-us-west-2.amazonaws.com/g5-orion-clients/g5-c-1t2d31r8-berkshire-communities/g5-cl-564oshgsv-berkshire-lauderdale-by-the-sea/uploads/lauderdale-hero-final.jpg"
      />

      <SimpleGrid
        m="4"
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {propertiesForRent.map((property) => (
          <>
            <Card>
              <Link href={`/property/${property._id}`} passHref>
                <CardHeader paddingBottom="0">
                  <Heading size="md" m="0">
                    {" "}
                    {property.name}
                  </Heading>
                </CardHeader>

                <CardBody>
                  <Stack>
                    <Box paddingRight="3" color="green.400">
                      <Flex justifyContent="center">
                        ${millify(property.price)}/month
                      </Flex>
                    </Box>
                    <Flex justifyContent="center">
                      <Image
                        src={property.imageUrl}
                        fallbackSrc="https://www.renderhub.com/virtual3d/apartment-building-10/apartment-building-10-01.jpg"
                        // width="200"
                        // height="130"
                        borderRadius="full"
                        boxSize="150px"
                        alt="property"
                      />
                    </Flex>
                    <Text fontWeight="bold" m="0">
                      {property.address}
                    </Text>
                    0
                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      w="250"
                      color="blue.400"
                      fontSize="sm"
                    >
                      {property.numBeds} <FaBed /> | {property.numBaths}{" "}
                      <FaBath /> | {millify(property.squareFootage)} sq. ft.{" "}
                      <BsGridFill />
                    </Flex>
                    <Text fontSize="sm" m="0">
                      {" "}
                      {property.description.length > 45
                        ? `${property.description.substring(0, 45)}...`
                        : property.description}
                    </Text>
                  </Stack>
                </CardBody>
              </Link>
            </Card>
          </>
        ))}
      </SimpleGrid>

      {/* Sale Part of Page */}

      <Banner2
        purpose="BUY A HOME"
        title1="Find & Buy Your"
        title2="Dream Home"
        desc1="See the Properties For Sale"
        desc2="in the St. Pete/Tampa Metro Area"
        buttonText="Properties for Sale"
        linkName="/search?purpose=for-sale"
        imageUrl="https://static.55places.com/blog/media/fl-4891d846a429b15c7bf4fea2478e27ee.jpg"
      />

      <SimpleGrid
        m="4"
        spacing={4}
        templateColumns="repeat(auto-fill, minmax(200px, 1fr))"
      >
        {propertiesForSale.map((property) => (
          <>
            <Card>
              <Link href={`/property/${property._id}`} passHref>
                <CardHeader paddingBottom="0">
                  <Heading size="md" m="0">
                    {" "}
                    {property.name}
                  </Heading>
                </CardHeader>

                <CardBody>
                  <Stack>
                    <Box paddingRight="3" color="green.400">
                      <Flex justifyContent="center">
                        ${millify(property.price)}
                      </Flex>
                    </Box>

                    <Flex justifyContent="center">
                      <Image
                        src={property.imageUrl}
                        fallbackSrc="https://media.istockphoto.com/photos/house-icon-3d-illustration-picture-id494183665?k=6&m=494183665&s=612x612&w=0&h=X3G5XxRBCuP3ud_kgRTgNQ3744XJN-s5_oGIvKgwogc="
                        // width="200"
                        // height="130"
                        borderRadius="full"
                        boxSize="150px"
                        alt="property"
                      />
                    </Flex>

                    <Text fontWeight="bold" m="0">
                      {property.address}
                    </Text>

                    <Flex
                      alignItems="center"
                      justifyContent="space-between"
                      w="250"
                      color="blue.400"
                      fontSize="sm"
                    >
                      {property.numBeds} <FaBed /> | {property.numBaths}{" "}
                      <FaBath /> | {millify(property.squareFootage)} sq. ft.{" "}
                      <BsGridFill />
                    </Flex>

                    <Text fontSize="sm" m="0">
                      {" "}
                      {property.description.length > 45
                        ? `${property.description.substring(0, 45)}...`
                        : property.description}
                    </Text>
                  </Stack>
                </CardBody>
              </Link>
            </Card>
          </>
        ))}
      </SimpleGrid>

      <Flex justifyContent="center">
        <Button onClick={toggleColorMode}>
          {colorMode === "light" ? "Dark Mode" : "Light Mode"}
        </Button>
      </Flex>
    </Box>
  );
};

export default Home;

export const Banner = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Image src={imageUrl} width={500} height={300} alt="banner" />
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium" m="0">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl" bg="blue.300" color="white">
        <Link href={linkName} legacyBehavior>
          <a>{buttonText}</a>
        </Link>
      </Button>
    </Box>
  </Flex>
);

export const Banner2 = ({
  purpose,
  title1,
  title2,
  desc1,
  desc2,
  buttonText,
  linkName,
  imageUrl,
}) => (
  <Flex flexWrap="wrap" justifyContent="center" alignItems="center" m="10">
    <Box p="5">
      <Text color="gray.500" fontSize="sm" fontWeight="medium" m="0">
        {purpose}
      </Text>
      <Text fontSize="3xl" fontWeight="bold">
        {title1}
        <br />
        {title2}
      </Text>
      <Text fontSize="lg" paddingTop="3" color="gray.700">
        {desc1}
        <br />
        {desc2}
      </Text>
      <Button fontSize="xl" bg="blue.300" color="white">
        <Link href={linkName} legacyBehavior>
          <a>{buttonText}</a>
        </Link>
      </Button>
    </Box>
    <Image src={imageUrl} width={500} height={300} alt="banner" />
  </Flex>
);

// export const Example = () => {
//   const { colorMode, toggleColorMode } = useColorMode()
//   return (
//     <header>
//       <Button onClick={toggleColorMode}>
//         Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
//       </Button>
//     </header>
//   )
// };
