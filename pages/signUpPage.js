import axios from "axios";
import { useState } from "react";
// import { Link } from "react-router-dom";
import { Flex, Box, Text, Button } from '@chakra-ui/react';


// const API_URL = process.env.REACT_APP_API_URL;

const API_URL = 'http://localhost:5005';

function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);


  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
console.log('Success! ', email, 'is signed in.')
      })
      .catch((err) => {
        const errorDescription = err.response.data.message;
        console.error(errorDescription);
        setErrorMessage(errorDescription);
      });
  };

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">Sign Up</Text>
      <form onSubmit={handleSignupSubmit}>
        <Flex>
 
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={email}
            onChange={handleEmail}
          />

          <label>Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handlePassword}
          />

        </Flex>

          <button type="submit">Submit</button>
      </form>

      {errorMessage && (
        <div>
          <p>{errorMessage}</p>
        </div>
      )}
      <Text> Already have an account?</Text>
      <Text>Sure, sure.</Text>

    </Box>
  );



}

export default SignUpPage;
