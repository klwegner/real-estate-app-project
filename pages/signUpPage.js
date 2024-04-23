import axios from "axios";
import { useState } from "react";
import { Flex, Box, Text, Input, Button, FormControl,  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Slide,
  useDisclosure  } from "@chakra-ui/react";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;


function SignUpPage() {
  const { isOpen, onToggle } = useDisclosure()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(undefined);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log("Success! ", email, "is signed in.");
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        console.error(errorDescription);
        setMessage(errorDescription);
        onToggle()
      });
  };

  return (
    <Box>
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Sign Up
      </Text>

      <form onSubmit={handleSignupSubmit}>
        <Flex justifyContent="center" flexDirection="column">
          <FormControl isRequired>
            <Input type="email" name="email" placeholder="Email" required />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </FormControl>
        </Flex>

        

        <Flex justifyContent="center" p="4">
          <Button type="submit">Sign Up</Button>
        </Flex>
      </form>

      <Flex justifyContent="center" flexDirection="column">
        <Text>Already have an account?</Text>
        <Link href="/loginPage" passHref>
          Login
        </Link>
      </Flex>
    </Box>
  );
}

export default SignUpPage;
