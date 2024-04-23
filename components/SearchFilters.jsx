// import { useState } from "react";
// import { Flex, Select, Box } from '@chakra-ui/react';

// import { filterData, getFilterValues } from '../utils/filterData';

// export default function SearchFilters({ onFilterChange }) {
//     const [filters, setFilters] = useState({
//         propertyType: '',
//         numBeds: '',
//         numBaths: '',
//         inFloodZone: '',
//         hasHOA: '',
//       });

//  const handleFilterChange = (event) => {
//     const target = event.target;
//     const value = target.type === 'select' ? target.value : target.checked;
//     const name = target.name;

//     setFilters((prevFilters) => ({
//       ...prevFilters,
//       [name]: value,
//     }));
//     if (onFilterChange) {
//         onFilterChange(filters); // Pass the updated filters to Search.jsx
//       }
//   };

//   return (
//     <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
//       {filterData?.map((filter) => (
//         <Box key={filter.queryName}>
//           <Select
//             name={filter.queryName} // Add name attribute
//             onChange={handleFilterChange}
//             placeholder={filter.placeholder}
//             w='fit-content'
//             p='2'
//           >
//             {filter?.items?.map((item) => (
//               <option value={item.value} key={item.value}>
//                 {item.name}
//               </option>
//             ))}
//           </Select>
//         </Box>
//       ))}
//     </Flex>
//   );
// }




import { useEffect, useState } from "react";
import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';
import { useRouter } from "next/router";
import { MdCancel } from 'react-icons/md';
import Image from 'next/image';
import { filterData, getFilterValues } from '../utils/filterData';
import NoResult from '../public/noResult.jpg';

export default function SearchFilters({ properties, onFilterChange }) {

        const [selectedFilters, setSelectedFilters] = useState([]); // Initialize selectedFilters as an empty array
        const [filters, setFilters] = useState(filterData); // Use filterData as the initial state for the filters
        console.log(filters);

        const handleFilterChange = (event) => {
            const target = event.target;
            const name = target.name;
            const value = target.value;
          
            setSelectedFilters((prevSelectedFilters) => {
              console.log('prev filters ', prevSelectedFilters);
              if (value === 'all') {
                console.log('value is all')
                // If the user selects 'all', reset the selectedFilters to an empty array
                setSelectedFilters([]);
              } else {
                
                const filterIndex = prevSelectedFilters.findIndex((filter) =>{
console.log('a filter ', filter)
                    console.log(filter.queryName)
                    filter.queryName === name
                }) ;
          
                if (filterIndex !== -1) {
                  // If the filter is already selected, remove it from the selectedFilters
                  const updatedSelectedFilters = [...prevSelectedFilters];
                  updatedSelectedFilters.splice(filterIndex, 1);
                  console.log(updatedSelectedFilters);
                  setSelectedFilters(updatedSelectedFilters);
                } else {
                  // If the filter is not selected, add it to the selectedFilters
                  console.log('selected filters ', selectedFilters)
                  setSelectedFilters((prevSelectedFilters) => [...prevSelectedFilters, { name, value }]);
                }
              }
            });
      
    
      const filteredProperties = properties.filter((property) => {
let matches = true;
for (const filterName in filters) {
    const filterValue = filters[filterName];
    if (filterValue) {
        const propertyValue = property[filterName.toLowerCase()]

        if (typeof propertyValue === "string") {
            matches = matches && (propertyValue.includes(filterValue))
        } else {
            matches = matches && (propertyValue === filterValue)
        }
    }
}

return matches;

      })
    
if (onFilterChange) {
    onFilterChange(filteredProperties);
}

    };

    return (
      <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
        {filters?.map((filter) => (
          <Box key={filter.queryName}>
            <Select 
                        placeholder={filter.placeholder}
name={filter.queryName}
            onChange={handleFilterChange}
            w='fit-content'
            p='2'>
              {filter?.items?.map((item) => (
                <option value={item.value} key={item.value}>
                  {item.name}
                </option>
              ))}
            </Select>
          </Box>
        ))}
      </Flex>
    );
  }