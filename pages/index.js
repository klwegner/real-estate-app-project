
import RentalPic from '../public/rentalpic.png';
import BuyPic from '../public/buypic.png';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import Property from '@/components/Property';
import axios from "axios";
import React, { useState, useEffect } from 'react';

const Home = () => {

  const [propertiesForSale, setPropertiesForSale] = useState([]);
  const [propertiesForRent, setPropertiesForRent] = useState([]);

  useEffect(() => {
    // Only fetch if logged in
      const fetchRentalProperties = async () => {
        const API_URL = 'http://localhost:5005';
        try {
          const response = await axios.get(`${API_URL}/api/properties/rentals`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          if (response.status === 200 && response.data) {
            const properties  = response.data;

            setPropertiesForRent(properties);
      // console.log(propertiesForRent);         
}
        } catch (error) {
console.error(error);        }
      };

      const fetchForSaleProperties = async () => {
        const API_URL = 'http://localhost:5005';
        try {
          const response = await axios.get(`${API_URL}/api/properties/forSale`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            },
          });
          if (response.status === 200 && response.data) {
            const properties  = response.data;

            setPropertiesForSale(properties);
      // console.log(propertiesForSale);         
}
        } catch (error) {
console.error(error);        }
      };
      fetchRentalProperties();
      fetchForSaleProperties();
    
  },[]);


  return (
 
  <Box backgroundColor="transparent">
    <Banner
      purpose='RENT A HOME'
      title1='Rental Homes With'
      title2='A Luxurious Feel'
      desc1='Explore Apartments, Townhomes, Villas'
      desc2='and more'
      buttonText='Rental Properties'
      linkName='/search?purpose=for-rent'
      imageUrl={RentalPic}
    />
    <Flex flexWrap='wrap'>
      {propertiesForRent.map((property) =>  {
      <Property property={property} key={property._id} />  }
)}
    
    </Flex>
    <Banner
      purpose='BUY A HOME'
      title1='Find & Buy Your'
      title2='Dream Home'
      desc1='Explore Apartments, Land, Penthouses,'
      desc2='villas and more'
      buttonText='Properties for Sale'
      linkName='/search?purpose=for-sale'
      imageUrl={BuyPic}
    />
    <Flex flexWrap='wrap'>
    
      {propertiesForSale.map((property) => <Property property={property} key={property._id} />)}
    </Flex>



  </Box>

  );
};

export default Home;






export const Banner = ({ purpose, title1, title2, desc1, desc2, buttonText, linkName, imageUrl }) => (
  <Flex flexWrap='wrap' justifyContent='center' alignItems='center' m='10'>
    <Image src={imageUrl} width={500} height={300} alt="banner"/>
    <Box p='5'>
      <Text color='gray.500' fontSize='sm' fontWeight='medium'>{purpose}</Text>
      <Text fontSize='3xl' fontWeight='bold'>{title1}<br />{title2}</Text>
      <Text fontSize='lg' paddingTop='3' paddingBottom='3' color='gray.700'>{desc1}<br />{desc2}</Text>
      <Button fontSize='xl' bg="blue.300" color="white">
        <Link href={linkName} legacyBehavior><a>{buttonText}</a></Link>
      </Button>
    </Box>
  </Flex>
);


// export async function getStaticProps() {
//   const API_URL = 'http://localhost:5005'; 

//   try {
//     const response = await axios.get(`${API_URL}/api/properties`, {
//       headers: {
//         Authorization: `Bearer ${localStorage.getItem("authToken")}`,
//       },
//     });

//     if (response.status === 200 && response.data) {
//       const properties = response.data;
//       console.log(properties);

//       // Sort properties by property type ("For Sale" or "Rental")
//       const propertiesForSale = properties.filter(
//         (property) => property.propertyType === "For Sale"
//       );
//       const propertiesForRent = properties.filter(
//         (property) => property.propertyType === "Rental"
//       );

//       return {
//         props: {
//           propertiesForSale,
//           propertiesForRent,
//         },
//       };
//     }
//   } catch (error) {
//     console.error(error);
//   }

//   // Handle errors or return empty arrays if data fetching fails
//   return {
//     props: {
//       propertiesForSale: [],
//       propertiesForRent: [],
//     },
//   };
// }