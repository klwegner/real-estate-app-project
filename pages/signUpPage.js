import axios from "axios";
import { useState } from "react";
import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  FormControl,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Slide,
  useDisclosure,
} from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

function SignUpPage() {
  const { isOpen, onToggle } = useDisclosure();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(undefined);
  const router = useRouter();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };
    console.log(requestBody);

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        if (response.status == 200) {
          // console.log(response)
          const token = response.data.authToken;
          localStorage.setItem("authToken", token);
          const email = response.data.user;
          localStorage.setItem("user", email);
          localStorage.setItem("isLoggedIn", true);
          console.log("Success! ", email, "is signed in.");

          router.push("/");
        } else {
          // console.log("Login failed.");
          setMessage(response);
          onToggle();
        }
      })
      .catch((err) => {
        // console.error("Login failed ", err);
        setMessage(err);
        onToggle();
      });
    // .catch((err) => {
    //   const errorDescription = err.response;
    //   console.error(errorDescription);
    //   setMessage(errorDescription);
    //   onToggle()
    // });
  };

  return (
    <Box>
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Sign Up
      </Text>

      <form onSubmit={handleSignupSubmit}>
        <Flex justifyContent="center" flexDirection="column">
          <FormControl isRequired>
            <Input
              type="email"
              name="email"
              placeholder="Email"
              required
              value={email}
              onChange={handleEmail}
            />
          </FormControl>
          <FormControl isRequired>
            <Input
              type="password"
              name="password"
              placeholder="Password"
              required
              value={password}
              onChange={handlePassword}
            />
          </FormControl>
        </Flex>

        {message && (
          <Slide direction="bottom" in={isOpen} style={{ zIndex: 10 }}>
            <Alert
              status="error"
              variant="subtle"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              textAlign="center"
              height="200px"
            >
              <AlertIcon boxSize="40px" mr={0} />
              <AlertTitle mt={4} mb={1} fontSize="lg">
                Error
              </AlertTitle>
              <AlertDescription maxWidth="sm">
                {message.message}
              </AlertDescription>
            </Alert>
          </Slide>
        )}

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
