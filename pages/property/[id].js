import { Box, Flex, Text, Avatar, Spacer } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import { fetchApi, baseUrl } from '@/utils/fetchAPI';
import ImageScrollbar from '@/components/ImageScrollbar';
import axios from "axios";


const API_URL = 'http://localhost:5005';


const PropertyDetails = ({ PropertyDetails: { name, description, address, propertyType, squareFootage, numBaths, numBeds, price, hasHOA, amenitiesIncluded, inFloodZone } }) => (

  const router = useRouter();
  const { _id } = router.query;

<Box maxWidth='1000px' margin='auto' p='4'>
    {/* {photos && <ImageScrollbar data={photos} />} */}
    <Box w='full' p='6'>
      <Flex paddingTop='2' alignItems='center'>
        {/* <Box paddingRight='3' color='green.400'>{isVerified && <GoVerified />}</Box> */}
        <Text fontWeight='bold' fontSize='lg'>
          {propertyType} ${price}
        </Text>
        <Spacer />
        {/* <Avatar size='sm' src={agency?.logo?.url}></Avatar> */}
      </Flex>
      <Flex alignItems='center' p='1' justifyContent='space-between' w='250px' color='blue.400'>
        {numBeds}<FaBed /> | {numBaths} <FaBath /> | {millify(squareFootage)} sq. ft. <BsGridFill />
      </Flex>
    </Box>
    <Box marginTop='2'>
      <Text fontSize='lg' marginBottom='2' fontWeight='bold'>{name}</Text>
      <Text lineHeight='2' color='gray.600'>{description}</Text>
    </Box>
    <Flex flexWrap='wrap' textTransform='uppercase' justifyContent='space-between'>
      {/* <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text fontWeight='bold'>{name}</Text>
      </Flex> */}
      <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3'>
        <Text fontWeight='bold'>{address}</Text>
      </Flex>
    
        <Flex justifyContent='space-between' w='400px' borderBottom='1px' borderColor='gray.100' p='3' >
          <Text>HOA fee?</Text>
          <Text fontWeight='bold'>{hasHOA}</Text>
          <Text>Flood zone?</Text>
          <Text fontWeight='bold'>{inFloodZone}</Text>
          <Text>Amenities included?</Text>
          <Text fontWeight='bold'>{amenitiesIncluded}</Text>
        </Flex>
      
    </Flex>
  
  </Box>
)

export default PropertyDetails;


// export async function getServerSideProps({ params: { _id }}) {

//     const data = await axios.get(`${API_URL}/api/properties/${_id}`);

//     return{
// props: {
//     PropertyDetails: data
// }

//     }
    
// }


export async function getServerSideProps(context) {
  const { router: { query: { _id } } } = context; // Destructure router and _id

  if (!_id) {
    return {
      props: {
        error: true,
        errorMessage: "Property ID not found",
      },
    };
  }
  
    const response = await axios.get(`${API_URL}/api/properties/${_id}`);

  try {
    const { name, description, address, propertyType, squareFootage, numBaths, numBeds, price, hasHOA, amenitiesIncluded, inFloodZone } = response.data;

    return {
      props: {
        PropertyDetails: { _id, name, description, address, propertyType, squareFootage, numBaths, numBeds, price, hasHOA, amenitiesIncluded, inFloodZone },
      },
    }
  } catch (error) {
    console.error(error);
    // Handle the error here (e.g., redirect to an error page)
    return {
      props: {
        error: true, // Indicate an error occurred
      },
    };
  }
}