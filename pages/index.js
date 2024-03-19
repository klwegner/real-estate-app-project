
import RentalPic from '../public/rentalpic.jpeg';
import BuyPic from '../public/buypic.jpeg';
import Link from 'next/link';
import Image from 'next/image';
import { Flex, Box, Text, Button } from '@chakra-ui/react';
import { baseUrl, fetchApi } from '../utils/fetchAPI';
import Property from '@/components/Property';
import Dubai from '../public/Dubai.jpg';


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


const Home = ({ propertiesForSale, propertiesForRent }) => (
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
      {propertiesForRent.map((property) => <Property property={property} key={property.id} />)}
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
    
      {propertiesForSale.map((property) => <Property property={property} key={property.id} />)}
    </Flex>
  </Box>
);

export async function getStaticProps() {
  const propertyForSale = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-sale&hitsPerPage=6`);
  const propertyForRent = await fetchApi(`${baseUrl}/properties/list?locationExternalIDs=5002&purpose=for-rent&hitsPerPage=6`);

  return {
    props: {
      propertiesForSale: propertyForSale?.hits,
      propertiesForRent: propertyForRent?.hits,
    },
  };
}

export default Home;