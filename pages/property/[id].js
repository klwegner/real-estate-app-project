import { useRouter } from 'next/router';
import axios from 'axios';
import Property from '@/components/Property';
import { Flex } from '@chakra-ui/react';


const API_URL = 'http://localhost:5005'; // Replace with your API URL

export async function getServerSideProps(context) {
  const { params: { id } } = context;
  console.log('the id ', id);


  if (!id) {
    return {
      props: {
        error: true,
        errorMessage: "Property ID not found",
      },
    };
  }
  const response = await axios.get(`${API_URL}/api/properties/${id}`);
  console.log(response)

  if (!response.data) {
    console.log('no data returned')
    return {
      notFound: true, // Handle 404 status code
    };
  }

  return {
    props: {
      property: response.data, // Rename the prop to "property" for clarity
    },
  };
}

export default function PropertyDetailsPage({ property, error, errorMessage }) {
  const router = useRouter();

  if (error) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!property) {
    return <div>Property not found.</div>;
  }

  return (
  <Flex justifyContent="center"><Property property={property} /></Flex>
  ); // Pass "property" prop
}
