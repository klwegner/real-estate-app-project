import axios from "axios";
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
  useDisclosure 
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import Link from "next/link";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const { isOpen, onToggle } = useDisclosure()



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
     setMessage(response)
     onToggle()
    }
  }

  return (
    <Box m="2">
      <Text fontSize="2xl" p="4" fontWeight="bold">
        Login
      </Text>

      <form onSubmit={handleSubmit}>
        <Flex justifyContent="center" flexDirection="column">
          <FormControl isRequired>
            <Input marginBottom="4" type="email" name="email" placeholder="Email" required />
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


        {message && (
  <Slide direction='bottom' in={isOpen} style={{ zIndex: 10 }}>
  <Alert
  status='error'
  variant='subtle'
  flexDirection='column'
  alignItems='center'
  justifyContent='center'
  textAlign='center'
  height='200px'
>
  <AlertIcon boxSize='40px' mr={0} />
  <AlertTitle mt={4} mb={1} fontSize='lg'>Error</AlertTitle>
  <AlertDescription maxWidth='sm'>
    {message}
  </AlertDescription>
</Alert>

</Slide>

      )}


        <Flex justifyContent="center" p="4">
          <Button type="submit">Login</Button>
        </Flex>
      </form>

      <Flex justifyContent="center" flexDirection="column">
        <Text>No account yet? {" "}
        
        <Link  href="/signUpPage" passHref>

          Sign Up
        </Link>

        </Text>

      </Flex>
    </Box>
  );
}
