// import { useEffect, useState } from "react";
// import { Flex, Select, Box, Text, Input, Spinner, Icon, Button } from '@chakra-ui/react';

// import { filterData, getFilterValues } from '../utils/filterData';

// export default function SearchFilters({ onFilterChange }) {
//   const [filters] = useState(filterData);
//   const [searchTerm, setSearchTerm] = useState('');

//   const handleFilterSelection = (e) => {
//     const filterValues = getFilterValues({ [e.target.name]: e.target.value });
//     onFilterChange(filterValues); // Pass selected filter values to Search component
//   };

//   return (
//     <Flex bg='gray.100' p='4' justifyContent='center' flexWrap='wrap'>
//       {filters?.map((filter) => (
//         <Box key={filter.queryName}>
//           <Select
//             name={filter.queryName} // Add name attribute
//             onChange={handleFilterSelection}
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
