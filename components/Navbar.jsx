import Link from 'next/link';
import Image from 'next/image';
import { Menu, MenuButton, MenuList, MenuItem, IconButton, Flex, Box, Spacer, Button } from '@chakra-ui/react';
import { FcMenu, FcHome, FcAbout } from 'react-icons/fc';
import { BsSearch } from 'react-icons/bs';
import { FiKey } from 'react-icons/fi';
import { IoIosAdd } from "react-icons/io";
import { FaDoorOpen } from "react-icons/fa";
import LogoutButton from './logoutButton';




const Navbar = () => (

    <Flex p="2" borderBottom="1" borderColor="gray.100" >
    <Box fontSize="3xl" color="blue.400" fontWeight="bold">
    <Link href="/">
    UAE Premier Real Estate
        </Link>
    </Box>
    <Spacer/>

<Menu>
    <MenuButton as={IconButton} icon={<FcMenu />} variant="outlined" color="red.400"/>

<MenuList>

    <Link href="/" passHref>
        <MenuItem icon={<FcHome/>}>Home</MenuItem>
    </Link>

    <Link href="/loginPage" passHref>
        <MenuItem icon={<FaDoorOpen />}>Login</MenuItem>
    </Link>

    <Link href="/createProperty" passHref>
        <MenuItem icon={<IoIosAdd />}>Add Property</MenuItem>
    </Link>

    <Link href="/search" passHref>
        <MenuItem icon={<BsSearch/>}>Search</MenuItem>
    </Link>

    <Link href="/search?purpose=for-sale" passHref>
        <MenuItem icon={<FcAbout/>}>Buy</MenuItem>
    </Link>

    <Link href="/search?purpose=for-rent" passHref>
        <MenuItem icon={<FiKey/>}>Rent</MenuItem>
    </Link>

    <LogoutButton/>



</MenuList>
</Menu>
    </Flex>

)

export default Navbar;
