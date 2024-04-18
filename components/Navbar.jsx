import Link from "next/link";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  Flex,
  Box,
  Spacer,
} from "@chakra-ui/react";
import { FcMenu } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { FaDoorOpen, FaHome } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";

const Navbar = () => (
  <Flex p="2" borderBottom="1" borderColor="gray.100">
    <Box fontSize="3xl" color="blue.400" fontWeight="bold">
      <Link href="/">Tampa Bay Properties</Link>
    </Box>
    <Spacer />

    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FcMenu />}
        variant="outlined"
        color="red.400"
      />
      <MenuList>
        <Link href="/" passHref>
          <MenuItem icon={<FaHome />}>Home</MenuItem>
        </Link>

        <Link href="/loginPage" passHref>
          <MenuItem icon={<FaDoorOpen />}>Login</MenuItem>
        </Link>

        <Link href="/createProperty" passHref>
          <MenuItem icon={<IoIosAdd />}>Add Property</MenuItem>
        </Link>

        <Link href="/search" passHref>
          <MenuItem icon={<BsSearch />}>Search</MenuItem>
        </Link>

        <Link href="/search?propertyType=For+Sale" passHref>
          <MenuItem icon={<GiMoneyStack />}>Buy</MenuItem>
        </Link>

        <Link href="/search?propertyType=Rental" passHref>
          <MenuItem icon={<FiKey />}>Rent</MenuItem>
        </Link>

        <Link href="/" passHref onClick={handleLogout}>
          <MenuItem icon={<IoLogOutSharp />}>Logout</MenuItem>
        </Link>
      </MenuList>
    </Menu>
  </Flex>
);

export default Navbar;

const handleLogout = () => {
  console.log("logging out?");
  localStorage.removeItem("authToken");
  router.push("/");
};
