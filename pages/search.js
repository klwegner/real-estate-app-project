import { useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { Flex, Box, Text, Icon, Button, ButtonGroup } from '@chakra-ui/react';
import { BsFilter } from 'react-icons/bs';
import SearchFilters from '@/components/SearchFilters';
import Property from '@/components/Property';
import NoResult from '../public/noResult.jpg';
import axios from "axios";


const API_URL = 'http://localhost:5005';


const Search = ({ properties }) => {
  const router = useRouter();
  const { propertyType } = router.query; // Access propertyType from URL

  const [selectedPropertyType, setSelectedPropertyType] = useState(propertyType || ''); // Initial state based on URL

  const handleFilterChange = (filterValues) => {
    setSelectedPropertyType(filterValues.propertyType || 'Rental'); // Update state based on filter
  };

  const handleTypeChange = (type) => {
    setSelectedPropertyType(type);
    router.push(`/search?propertyType=${type}`); // Update URL with selected type
  };

  // Use useMemo to memoize filtered properties based on filters and properties
  const filteredProperties = useMemo(() => {
    const typeToFilter = selectedPropertyType || propertyType; // Consider both sources

    if (!typeToFilter) {
      return properties; // Return all properties if no filter
    }

    return properties.filter((property) => property.propertyType === typeToFilter);
  }, [selectedPropertyType, propertyType, properties]);

// const Search = ({ properties }) => {

  
//   const [propertyType, setPropertyType] = useState(''); // Initial state for property type filter

//   const handleFilterChange = (filterValues) => {
//     setPropertyType(filterValues.propertyType || 'Rental'); // Set property type based on filter
//   };

//   const router = useRouter();

//   const handleTypeChange = (type) => setPropertyType(type);

//   const filteredProperties = useMemo(() => {
//     if (!propertyType) {
//       return properties;
//     }

//     return properties.filter((property) => property.propertyType === propertyType);
//   }, [propertyType, properties]);

  return (
    <Box>
      {/* <Flex
        cursor="pointer"
        bg="gray.100"
        borderBottom="1"
        borderColor="gray.200"
        p="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setSearchFilters((prevFilters) => !prevFilters)}
      >
        <Text>Search Properties</Text>
        <Icon paddingLeft="2" w="7" as={BsFilter} />
      </Flex> */}
      {/* {SearchFilters && <SearchFilters onFilterChange={handleFilterChange} />} */}
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Available Properties
      </Text>
      <Flex justifyContent="center">

    
      <ButtonGroup p="4">
      <Button isActive={propertyType === 'Rental'} onClick={() => handleTypeChange('')}>
          All
        </Button>
        <Button isActive={propertyType === 'Rental'} onClick={() => handleTypeChange('Rental')}>
          Rental
        </Button>
        <Button isActive={propertyType === 'For Sale'} onClick={() => handleTypeChange('For Sale')}>
          For Sale
        </Button>
      </ButtonGroup>
      </Flex>


      {filteredProperties.length > 0 && ( 
        <Flex justifyContent="center" flexWrap="wrap">
          {filteredProperties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
      )}

      {filteredProperties.length === 0 && properties.length > 0 && (
        <Text fontSize="xl" p="4">
          No properties match your current filters. Try adjusting your filters.
        </Text>
      )}

      {properties.length === 0 && ( 
        <Flex justifyContent="center" alignItems="center" flexDirection="column" marginTop="5" marginBottom="5">
          <Image alt="no result" src={NoResult} width="400" height="260" />
          <Text fontSize="2xl" marginTop="3">
            No Results Found
          </Text>
        </Flex>
      )}
    </Box>
  );
};

export default Search;

  export async function getServerSideProps() {
    const url = new URL(`${API_URL}/api/properties`, 'http://localhost:5005');
    const data = await axios.get(url.toString());
    const properties = data?.data || [];
    // console.log('properties on search page', properties)
  
    return {
      props: {
        properties,
      },
    };
  }