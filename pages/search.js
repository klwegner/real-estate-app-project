import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Icon,
  Box,
  Text,
  Button,
  Flex,
  Select,
  Spacer,
  Heading,
  Stack,
} from "@chakra-ui/react";
import Property from "@/components/Property";
import axios from "axios";
import { BsFilter } from "react-icons/bs";
import { filterData } from "../utils/filterData";
import { useColorMode, useColorModeValue } from "@chakra-ui/react";


const API_URL = process.env.NEXT_PUBLIC_API_URL;

const Search = ({ properties }) => {
  const { toggleColorMode } = useColorMode()
  const router = useRouter();
  const { propertyType } = router.query;
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState(properties);
  const [filters, setFilters] = useState(filterData);
  const [showFilters, setShowFilters] = useState(false);
  const color = useColorModeValue('gray.100', 'blue.400');


  const handleFilterChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    const parsedValue =
      typeof filterData.find((filter) => filter.queryName === name)?.type ===
      "number"
        ? parseInt(value)
        : value; 

    setSelectedFilters((prevSelectedFilters) => {
      // console.log("prev filters ", prevSelectedFilters);
      if (value === "all") {
        const updatedSelectedFilters = prevSelectedFilters.filter(
          (filter) => filter.name !== name
        );
        return updatedSelectedFilters;
      } else {
        // Check if prevSelectedFilters is empty
        if (prevSelectedFilters.length === 0) {
          // console.log({ name, value });
          return [{ name, value: parsedValue }];
        } else {
          const updatedSelectedFilters = prevSelectedFilters.map((filter) => {
            if (filter.name === name) {
              // Update the value if the filter name matches
              return { ...filter, value: parsedValue };
            }
            return filter;
          });
          // If the filter name doesn't exist, add it to the selectedFilters
          if (!updatedSelectedFilters.some((filter) => filter.name === name)) {
            return [...updatedSelectedFilters, { name, value: parsedValue }];
          }
          return updatedSelectedFilters;
        }
      }
    });

  };

  useEffect(() => {
    // console.log(router.query);

    const initialSelectedFilters = [];
    if (propertyType) {
      const matchingFilter = filterData.find(
        (filter) => filter.queryName === "propertyType"
      );
      if (matchingFilter) {
        initialSelectedFilters.push({
          name: matchingFilter.queryName,
          value: propertyType,
        });
      }
    }
    setSelectedFilters(initialSelectedFilters);
  }, [propertyType]); 

  useEffect(() => {
    const filteredProperties = properties.filter((property) => {
      if (selectedFilters.length === 0) {
        return true;
      }

      let matches = true;
      for (const filter of selectedFilters) {
        const propertyName = filter.name;
        const propertyValue = property[propertyName];

        const filterValue =
          typeof filterData.find((filter) => filter.queryName === filter.name)
            ?.type === "number"
            ? parseInt(filter.value)
            : filter.value;

        if (typeof propertyValue === "string") {
          matches = matches && propertyValue == filterValue;
        } else if (typeof propertyValue == "boolean") {
          matches = matches && propertyValue == (filterValue === "true");
        } else {
          matches = matches && propertyValue == filterValue;
        }
      }
      return matches;
    });

    setFilteredProperties(filteredProperties);
    // console.log(filteredProperties);
  }, [selectedFilters, properties, router.query]);

  return (
    <Box marginTop="2">
      <Flex
        cursor="pointer"
        bg={color}
        borderBottom="2"
        borderColor="gray.200"
        paddingTop="2"
        fontWeight="black"
        fontSize="lg"
        justifyContent="center"
        alignItems="center"
        onClick={() => setShowFilters(!showFilters)}
      >
        <Text>Search Properties</Text>
        <Icon
          paddingLeft="2"
          w="7"
          marginBottom="4"
          paddingBottom="0"
          as={BsFilter}
        />
      </Flex>

      {/* start filter section */}
      <Flex flexDirection="column" justifyContent="center">
        <Flex bg={color} justifyContent="center" flexWrap="wrap">
          {showFilters &&
            filters?.map((filter) => (
              <Box key={filter.queryName}>
                <Select
                  placeholder={filter.placeholder}
                  name={filter.queryName}
                  onChange={handleFilterChange}
                  w="fit-content"
                  p="4"
                >
                  {filter?.items?.map((item) => (
                    <option value={item.value} key={item.value}>
                      {item.name}
                    </option>
                  ))}
                </Select>
              </Box>
            ))}
        </Flex>
      </Flex>
      {/* End filter section */}

      <Flex justifyContent="space-between">
        <Text fontSize="2xl" p="4" fontWeight="bold">
          Available Properties
        </Text>
        <Spacer />
        <Button
          w="auto"
          marginTop="4"
          marginRight="4"
          marginBottom="4"
          p="4"
          onClick={() => {
            setFilteredProperties(properties);
            setSelectedFilters([]);
            router.push('/search')
            // router.replace(router.pathname);
          }}
        >
          Reset Filters
        </Button>
      </Flex>

      {filteredProperties.length > 0 && (
        <Flex justifyContent="center" flexWrap="wrap">
          {filteredProperties.map((property) => (
            <Property property={property} key={property.id} />
          ))}
        </Flex>
      )}

      {filteredProperties.length === 0 && properties.length > 0 && (
        <>
          <Stack>
            <Heading textAlign="center">Sorry!</Heading>
            <Text fontSize="xl" p="4" textAlign="center">
              No properties match your current filters. Try adjusting your
              filters.
            </Text>
          </Stack>
        </>
      )}

      {properties.length === 0 && (
        <Flex
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          marginTop="5"
          marginBottom="5"
        >
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
  const data = await axios.get(`${API_URL}/api/properties`);
  const properties = data?.data || [];

  return {
    props: {
      properties,
    },
  };
}
