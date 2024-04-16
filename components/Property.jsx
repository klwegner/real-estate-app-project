import Link from "next/link";
import Image from "next/image";
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaBed, FaBath } from "react-icons/fa";
import { BsGridFill } from "react-icons/bs";
import millify from "millify";
import defaultImage from "../public/defaultImage.jpg";

const Property = ({
  property: {
    _id,
    name,
    description,
    address,
    imageUrl,
    propertyType,
    squareFootage,
    numBaths,
    numBeds,
    price,
    hasHOA,
    amenitiesIncluded,
    inFloodZone,
  },
}) => {
  return (
    <Link href={`/property/${_id}`} passHref>
      <Flex
        flexWrap="wrap"
        w="420px"
        p="5"
        paddingTop="0"
        justifyContent="flex-start"
        cursor="pointer"
      >
        <Box>
          <Box paddingRight="3" color="green.400">
            {" "}
            {propertyType}
          </Box>
          <Image
            src={imageUrl ? imageUrl : defaultImage}
            width="400"
            height="260"
            alt="property"
          />
        </Box>

        <Box w="full">
          <Flex
            paddingTop="2"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center">
              <Text fontWeight="bold" fontSize="lg">
                {" "}
                ${millify(price)}
              </Text>
            </Flex>
            <Box></Box>
          </Flex>

          <Flex
            alignItems="center"
            p="1"
            justifyContent="space-between"
            w="250"
            color="blue.400"
          >
            {numBeds} <FaBed /> | {numBaths} <FaBath /> |{" "}
            {millify(squareFootage)} sq. ft. <BsGridFill />
          </Flex>
          <Text fontSize="lg">
            {name.length > 30 ? `${name.substring(0, 30)}...` : name}
          </Text>
          <Text fontSize="md" fontWeight="bold">
            {address}
          </Text>

          <Text fontSize="md">
            {description.length > 120
              ? `${description.substring(0, 120)}...`
              : description}
          </Text>

          <Text fontSize="sm">
            {`${"Amenities included: " + amenitiesIncluded}`}
          </Text>

          {inFloodZone === false ? (
            <Text fontSize="sm">This property is not in a flood zone. </Text>
          ) : (
            <Text fontSize="sm">This property is in a flood zone.</Text>
          )}

          {hasHOA === false ? (
            <Text fontSize="sm">This property is not in an HOA. </Text>
          ) : (
            <Text fontSize="sm">This property is in an HOA.</Text>
          )}
        </Box>
      </Flex>
    </Link>
  );
};

export default Property;
