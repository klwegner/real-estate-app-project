import axios from "axios";
import {
  Flex,
  Box,
  Text,
  Input,
  Button,
  FormControl,
  Spacer,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const API_URL = 'http://localhost:5005';

export default function LoginPage() {
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const requestBody = { email, password };

    const response = await axios.post(`${API_URL}/auth/login`, requestBody);

    // console.log(response.data);
    if (response.status == 200) {
      const token = response.data.authToken;
      localStorage.setItem("authToken", token);
      router.push("/");
    } else {
      console.log("Login failed.");
      console.error(response);
    }
  }

  return (
    <Box>
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Login
      </Text>

      <form onSubmit={handleSubmit}>
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
          <Button type="submit">Login</Button>
        </Flex>
      </form>

      <Flex justifyContent="center" flexDirection="column">
        <Text>No account yet? </Text>

        <Spacer />

        <Link href="/signUpPage" passHref>
          {" "}
          Sign Up
        </Link>
      </Flex>
    </Box>
  );
}
