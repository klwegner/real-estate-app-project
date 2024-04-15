import Link from 'next/link';
import Image from 'next/image';
import { Box, Flex, Text, Avatar } from '@chakra-ui/react';
import { FaBed, FaBath } from 'react-icons/fa';
import { BsGridFill } from 'react-icons/bs';
import { GoVerified } from 'react-icons/go';
import millify from 'millify';
import defaultImage from '../public/defaultImage.jpg';

const Property = ({property: { _id, name, description, address, propertyType, squareFootage, numBaths, numBeds, price, hasHOA, amenitiesIncluded, inFloodZone}}) => {

        return(
        <Link href = {`/property/${_id}`} passHref>
<Flex flexWrap="wrap" w="420px"p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
    <Box>
    <Text>Image here soon</Text>
{/* <Image src={coverPhoto ? coverPhoto.url : defaultImage} width="400" height="260" alt="property"/> */}
    </Box>
    <Box w="full">
        <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
            <Flex alignItems="center">
                <Box paddingRight="3" color="green.400"> {propertyType}

                </Box>
                <Text fontWeight="bold" fontSize="lg"> ${millify(price)}</Text>
            </Flex>
            <Box>
                {/* <Avatar size="sm" src={agency?.logo?.url} /> */}

            </Box>
        </Flex>
        <Flex alignItems="center" p="1" justifyContent="space-between" w="250" color="blue.400">
        {numBeds} <FaBed/> | {numBaths} <FaBath/> | {millify(squareFootage)} sq. ft. <BsGridFill />
        </Flex>
        <Text fontSize="lg">
            {name.length > 30 ? `${name.substring(0,30)}...` : name }
        </Text>
    </Box>
</Flex>      

  </Link>
    )

}

    

//     const Property = ({property: { coverPhoto, price, rentFrequency, rooms, title, baths, area, agency, isVerified, externalID}}) => {

//     return(
//         <Link href = {`/property/${externalID}`} passHref>
// <Flex flexWrap="wrap" w="420px"p="5" paddingTop="0" justifyContent="flex-start" cursor="pointer">
//     <Box>
// <Image src={coverPhoto ? coverPhoto.url : defaultImage} width="400" height="260" alt="property"/>
//     </Box>
//     <Box w="full">
//         <Flex paddingTop="2" alignItems="center" justifyContent="space-between">
//             <Flex alignItems="center">
//                 <Box paddingRight="3" color="green.400"> {isVerified && <GoVerified/>}

//                 </Box>
//                 <Text fontWeight="bold" fontSize="lg">AED {millify(price)} {rentFrequency && `/${rentFrequency}`}</Text>
//             </Flex>
//             <Box>
//                 <Avatar size="sm" src={agency?.logo?.url} />

//             </Box>
//         </Flex>
//         <Flex alignItems="center" p="1" justifyContent="space-between" w="250" color="blue.400">
//         {rooms} <FaBed/> | {baths} <FaBath/> | {millify(area)} sq. m. <BsGridFill />
//         </Flex>
//         <Text fontSize="lg">
//             {title.length > 30 ? `${title.substring(0,30)}...` : title }
//         </Text>
//     </Box>
// </Flex>      

//   </Link>
//     )

// }

export default Property;