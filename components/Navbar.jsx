import { useState, useEffect } from "react";
import {
  Image,
  Flex,
  Box,
  Link,
  Text,
  Spacer,
  Divider,
} from "@chakra-ui/react";
import { FcMenu } from "react-icons/fc";
import { BsSearch } from "react-icons/bs";
import { FiKey } from "react-icons/fi";
import { IoIosAdd } from "react-icons/io";
import { FaDoorOpen, FaHome } from "react-icons/fa";
import { IoLogOutSharp } from "react-icons/io5";
import { GiMoneyStack } from "react-icons/gi";
import { GiHouseKeys } from "react-icons/gi";
// import { logo } from '../public/logo.png';
import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogout = () => {
    console.log("logging out?");
    localStorage.removeItem("authToken");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");
    router.push("/");
  };

  useEffect(() => {
    const status = localStorage.getItem("isLoggedIn");
    // console.log('user is logged In?', status);
    setLoggedIn(status);
  }, [loggedIn]);

  return (
    <>
      {loggedIn && (
        <>
          <Box
            width="94%"
            backgroundColor="inherit"
            marginLeft="3%"
            marginRight="3%"
            p="0"
          >
            <Flex
              p="0"
              borderBottom="1"
              borderColor="gray.100"
              alignItems="end"
              justifyContent="space-between"
              flexDirection="row"
            >
              <>
                <Link href="/">
                  <Image
                    src="https://res.cloudinary.com/dcxxdakoc/image/upload/v1713881164/1_pvurei.png"
                    alt="Logo for Unlock Tampa Bay"
                    width={250}
                    height={155}
                  />
                </Link>
              </>
              <Spacer />
              <>
                <Text as="i" fontSize="xl" color="blue.400" fontWeight="bold">
                  Your Key to Tampa Bay's Hottest Homes, Apartments, Townhomes,
                  and Condos
                </Text>
              </>
            </Flex>

            <Divider marginBottom={1} />

            {/* row of menu links */}
            <Flex justifyContent="space-around" p="0">
              <Link href="/createProperty" fontWeight="bold">
                Add Property{" "}
              </Link>

              <Link href="/search" fontWeight="bold">
                Search
              </Link>

              <Link href="/search?propertyType=For+Sale" fontWeight="bold">
                Buy{" "}
              </Link>

              <Link href="/search?propertyType=Rental" fontWeight="bold">
                Rent{" "}
              </Link>

              <Link href="/" fontWeight="bold" onClick={handleLogout}>
                Logout
              </Link>
            </Flex>
          </Box>
        </>
      )}

      <>
        {!loggedIn && (
          <>
            <Box
              width="94%"
              backgroundColor="inherit"
              marginLeft="3%"
              marginRight="3%"
              p="0"
            >
              <Flex
                p="0"
                borderBottom="1"
                borderColor="gray.100"
                alignItems="end"
                justifyContent="space-between"
                flexDirection="row"
              >
                <>
                  <Link href="/">
                    <Image
                      src="https://res.cloudinary.com/dcxxdakoc/image/upload/v1713881164/1_pvurei.png"
                      alt="Logo for Unlock Tampa Bay"
                      width={250}
                      height={155}
                    />
                  </Link>
                </>
                <Spacer />
                <>
                  <Text as="i" fontSize="xl" color="blue.400" fontWeight="bold">
                    Your Key to Tampa Bay&apos;s Hottest Homes, Apartments,
                    Townhomes, and Condos
                  </Text>
                </>
              </Flex>

              <Divider marginBottom={1} />

              {/* row of menu links */}
              <Flex justifyContent="space-around" p="0">
                <Link href="/loginPage" fontWeight="bold">
                  Login
                </Link>

                <Link href="/signUpPage" fontWeight="bold">
                  Sign Up
                </Link>

                <Link href="/search" fontWeight="bold">
                  Search
                </Link>

                <Link href="/search?propertyType=For+Sale" fontWeight="bold">
                  Buy{" "}
                </Link>

                <Link href="/search?propertyType=Rental" fontWeight="bold">
                  Rent{" "}
                </Link>
              </Flex>
            </Box>
          </>
        )}
      </>
    </>
  );
};

export default Navbar;
